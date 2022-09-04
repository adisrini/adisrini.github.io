open! Core

module Number = struct
  type zero = [ `zero ]

  type 'x succ = [ `succ of 'x ]

  type 'x t = Zero : zero t | Succ : 'x t -> 'x succ t
end

module LT = struct
  type ('x, 'y) t =
    (* For any x, 0 is less than succ(x) *)
    | Zero : 'x Number.t -> (Number.zero, 'x Number.succ) t
    (* For any x, x is less than succ(x) *)
    (* | Succ : 'x Number.t -> ('x, 'x Number.succ) t *)
    (* For any x and y, if x < y and y < z, then x < z *)
    (* | Trans : ('x, 'y) t * ('y, 'z) t -> ('x, 'z) t *)
    (* For any x and y, if succ(x) < succ(y), then x < y *)
    | Succ : ('x, 'y) t -> ('x, 'y Number.succ) t
    | Pred : ('x Number.succ, 'y Number.succ) t -> ('x, 'y) t

  let equal : type x. (x, x) t -> 'a =
   fun (_ : _ t) -> failwithf "Impossible" ()

  let sym : type x y. (x, y) t -> (y, x) t -> 'a =
   fun (_ : _ t) (_ : _ t) -> failwithf "It should never be possible!" ()
end

module List = struct
  type ('len, 'x) t =
    | [] : (Number.zero, 'x) t
    | ( :: ) : 'x * ('len, 'x) t -> ('len Number.succ, 'x) t

  let rec index :
      type len x n.
      (len Number.succ, x) t ->
      n:n Number.t ->
      lt:(n, len Number.succ) LT.t ->
      x =
   fun t ~n ~lt ->
    match (t, n) with
    | x :: _, Number.Zero -> x
    | _ :: (_ :: _ as rest), Succ n -> index rest ~n ~lt:(LT.Pred lt)
    | [ x ], Succ Zero -> LT.equal lt
    (* zero succ < n *)
    (*
       Zero n => (zero, n succ)
       Succ (Zero n) => (zero succ)
    *)
    | [ x ], Succ n -> LT.sym (LT.Succ (LT.Zero n)) lt
end

let x = List.[ 1 ]

let y = List.index x ~n:Number.Zero ~lt:(LT.Zero Number.Zero)
