(ns boxcloj.core
  (:require [clojure.string :as str]))

(defn log [message]
  (.log js/console message))

(defn rand-color []
  (str "rgb(" (str/join "," (take 3 (repeatedly #(rand-int 255))))))

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
(def NUM-CIRCLES 40)
(def MAX-SIZE 1)
(def MAX-INIT-VEL 5)

(defn scale [canvas dim]
  (defn height []
    (/ (.-height canvas) SCALE))
  (defn width []
    (/ (.-width canvas) SCALE))
  (cond (= dim :height) (height)
        (= dim :width) (width)))

(defn centered-rand-int [n]
  (- (rand-int n) (/ n 2)))

(defn draw! [args]
  (let [[x y r] args]
    (.beginPath ctx)
    (.arc ctx x y r 0 (* 2 (.-PI js/Math)) false)
    (set! (. ctx -fillStyle) "black")
    (.fill ctx)
    (set! (. ctx -lineWidth) 1)
    (set! (. ctx -strokeStyle) "#335588")
    (.stroke ctx)))

(defn init []
  (let [dynamics      (.-Dynamics js/Box2D)
        collision     (.-Collision js/Box2D)
        vec           (-> js/Box2D (.-Common) (.-Math) (.-b2Vec2))
        shapes        (.-Shapes collision)
        b2body-def    (.-b2BodyDef dynamics)
        b2body        (.-b2Body dynamics)
        b2fixture-def (.-b2FixtureDef dynamics)
        b2fixture     (.-b2Fixture dynamics)
        b2world       (.-b2World dynamics)
        b2circle      (.-b2CircleShape shapes)
        b2contact-listner (.-b2ContactListener dynamics)
        fix-def       (new b2fixture-def)
        body-def      (new b2body-def)
        position      (.-position body-def)]
    
    (def world (new b2world (new vec 0 0) true))


    (let [contact-listener (.-b2ContactListener dynamics)
          listener (new contact-listener)]
      (set! (.-BeginContact listener) (fn [c] (log "yowch!") (log c)))
      (.SetContactListener world listener))
    
    (set! (.-type body-def) (.-b2_dynamicBody b2body))
    (loop [n 0]
      (if (< n NUM-CIRCLES)
        (do
          (set! (.-shape fix-def) (new b2circle (+ (* MAX-SIZE (rand)) 0.2)))
          (set! (.-x position) (rand-int SCALE))
          (set! (.-y position) (rand-int SCALE))
          (set! (.-linearVelocity body-def)
                (new vec (centered-rand-int MAX-INIT-VEL)
                         (centered-rand-int MAX-INIT-VEL)))
          (.CreateFixture (.CreateBody world body-def) fix-def)
          (recur (inc n)))))))


(defn update []
  (.Step world (/ 1 60) 10, 10)
  (.clearRect ctx 0 0 1000 1000)
  (loop [node (.GetBodyList world)]
    (if node
      (do
        (if (.GetFixtureList node)
          (draw! (get-draw-args node)))
        (recur (.GetNext node)))))
  (.ClearForces world)
  (js/requestAnimFrame update))


(defn get-draw-args [node]
  (let [x (* (.-x (.GetPosition node)) (scale canvas :width))
        y (* (.-y (.GetPosition node)) (scale canvas :height))
        r (-> node
              (.GetFixtureList)
              (.GetShape)
              (.-m_radius)
              (* (scale canvas :width)))]
    [x y r]))

(init)
(js/requestAnimFrame update)


(defn nodes [world]
  (loop [node (.GetBodyList world)]
    (if node
      (do
        (if (.GetFixtureList node)
          (draw (get-draw-args node)))
        (recur (.GetNext node))))))
