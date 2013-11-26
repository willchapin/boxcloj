(ns boxcloj.maths)


(def sqrt (.-sqrt js/Math))
(def pow (.-pow js/Math))
(defn square [x] (* x x))