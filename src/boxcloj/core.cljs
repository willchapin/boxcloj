(ns boxcloj.core)

(defn log [message]
  (.log js/console message))

;(defn rand-color []
;  (str "rgb(" (string/join "," (take 3 (repeatedly #(rand-int 255))))))

(defn getAnimFrameType []
  (or  (.-requestAnimationFrame js/window)
       (.-webkitRequestAnimationFrame js/window)
       (.-mozAnimationFrame js/window)
       (.-oAnimationFrame js/window)
       (.-msAnimationFrame js/window)))

(defn setAnimFrame []
  (set!
   (.-requestAnimFrame js/window)
   (getAnimFrameType)))

(setAnimFrame)

;; set global canvas and context
(def canvas (.getElementById js/document "c"))
(def ctx (.getContext canvas "2d"))

(def SCALE 30)

(defn draw [x y]
  (log (str x "  " y))
  (.beginPath ctx)
  (.arc ctx x y 100 0 (* 2 (.-PI js/Math)) false)
  (set! (. ctx -fillStyle) "black")
  (.fill ctx)
  (set! (. ctx -lineWidth) 1)
  (set! (. ctx -strokeStyle) "#335588")
  (.stroke ctx))

(defn init []
  (let [dynamics      (.-Dynamics js/Box2D)
        collision     (.-Collision js/Box2D)
        gravity-vec   (-> js/Box2D (.-Common) (.-Math) (.-b2Vec2))
        shapes        (.-Shapes collision)
        b2body-def    (.-b2BodyDef dynamics)
        b2body        (.-b2Body dynamics)
        b2fixture-def (.-b2FixtureDef dynamics)
        b2fixture     (.-b2Fixture dynamics)
        b2world       (.-b2World dynamics)
        b2circle      (.-b2CircleShape shapes)
        fix-def       (new b2fixture-def)
        body-def      (new b2body-def)
        position      (.-position body-def)]
    
    (def world (new b2world (new gravity-vec 0.4 0.2) true))
    (set! (.-type body-def) (.-b2_dynamicBody b2body))
    (set! (.-shape fix-def) (new b2circle 1))
    (set! (.-x position) 15)
    (set! (.-y position) 15)
    (.CreateFixture (.CreateBody world body-def) fix-def)))


(defn update []
  (.Step world (/ 1 60) 10, 10)
  (.clearRect ctx 0 0 1000 1000)
  (loop [node (.GetBodyList world)]
    (if node
      (if (.GetFixtureList node)
        (let [x (* (.-x (.GetPosition node)) (/ (.-width canvas) SCALE))
              y (* (.-y (.GetPosition node)) (/ (.-height canvas) SCALE))]
          (draw x y)))
      (recur (.GetNext node))))
  (.ClearForces world)
  (js/requestAnimFrame update))

(init)
(js/requestAnimFrame update)
