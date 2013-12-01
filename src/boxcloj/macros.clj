(ns boxcloj.macros)

(defmacro my_set! [obj & args]
  (doseq [[attr val] (partition 2 args)]
    `(set! (~attr ~obj) ~value)))


