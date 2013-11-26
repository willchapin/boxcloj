(ns boxcloj.core
  (:require [clojure.string :as str]
            [boxcloj.maths :refer [sqrt pow square]]))


;; set utility functions

(defn log [message]
  (.log js/console message))

(defn b2vec [x y]
  (let [vec (-> js/Box2D (.-Common) (.-Math) (.-b2Vec2))]
    (new vec x y)))

(defn rand-color []
  (str "rgb(" (str/join "," (take 3 (repeatedly #(rand-int 255))))))

(defn getAnimFrameType []
  (or  (.-requestAnimationFrame js/window)
       (.-webkitRequestAnimationFrame js/window)
       (.-mozAnimationFrame js/window)
       (.-oAnimationFrame js/window)
       (.-msAnimationFrame js/window)))

(defn setAnimFrame []
  (set! (.-requestAnimFrame js/window) (getAnimFrameType)))

(setAnimFrame)

(defn types-match? [contact]
  (= (.GetType (.GetFixtureA contact))
     (.GetType (.GetFixtureB contact))))

(defn play [shape]
  (let [r (.-m_radius shape)]
    (.play
     (new js/Audio
          (nth notes (.floor js/Math (* r 2)))))))

;; set global variables and constants

(def notes ["sounds/E5_wet.wav"            
            "sounds/C5_wet.wav"                     
            "sounds/A4.wav"
            "sounds/G4.wav"
            "sounds/F4_wet.wav"
            "sounds/D4.wav"
            "sounds/Bb3.wav"
            ])


(def canvas (.getElementById js/document "c"))
(def ctx (.getContext canvas "2d"))

(def SCALE 30)
(def GRAVITY 0.1)
(def NUM-CIRCLES 10)
(def MAX-SIZE 3)
(def MAX-INIT-VEL 10)

(def RESTITUTION 0.9)
(def FRICTION 0.2)

(def pairs (atom #{}))
(def selected (atom #{}))

;; scalers and calculation helpers

(defn scale [canvas dim]
  (defn height []
    (/ (.-height canvas) SCALE))
  (defn width []
    (/ (.-width canvas) SCALE))
  (cond (= dim :height) (height)
        (= dim :width) (width)))

(defn centered-rand-int [n]
  (- (rand-int n) (/ n 2)))

;; drawing functions

(defn paired? [node]
  (some #(contains? % node) @pairs))

(defn selected? [node]
  (contains? @selected node))

(defn draw-all! [nodes]
  (loop [node (first nodes) nodes (rest nodes)]
    (when node
      (if (selected? node) (def color "#333")
          (if (paired? node) (def color "#358")
              (def color "black")))
      (draw! color (get-draw-args node))
      (recur (first nodes) (rest nodes)))))

(defn draw! [color [x y r]]
   (set! (. ctx -fillStyle) color)
   (set! (. ctx -lineWidth) 1)
   (set! (. ctx -strokeStyle) "#335588")
   (.beginPath ctx)
   (.arc ctx x y r 0 (* 2 (.-PI js/Math)) false)
   (.fill ctx)
   (.stroke ctx))

(defn draw-from-to! [x1 y1 x2 y2]
  (set! (. ctx -lineWidth) 0.5)
  (set! (. ctx -strokeStyle) "aaa")
  (.beginPath ctx)
  (.moveTo ctx x1 y1)
  (.lineTo ctx x2 y2)
  (.stroke ctx))

(defn draw-connection! [pair]
  (let [[[x1 y1 r1] [x2 y2 r2]] (map get-draw-args pair)]
    (draw-from-to! x1 y1 x2 y2)))

(defn process-pairs! [pairs]
  (doseq [pair pairs]
    (update-force! pair)
    (draw-connection! pair)))

(defn update-force! [pair]
  (let [[[x1 y1 r1] [x2 y2 r2]] (map get-draw-args pair)
        vecs [(b2vec (* GRAVITY (- x2 x1)) (* GRAVITY (- y2 y1)))
              (b2vec (* GRAVITY (- x1 x2)) (* GRAVITY (- y1 y2)))]]
    (doseq [[body velocity] (map list pair vecs)]
      (.ApplyForce body velocity (.GetWorldCenter body)))))

(defn get-draw-args [node]
  (let [x (* (.-x (.GetPosition node)) (scale canvas :width))
        y (* (.-y (.GetPosition node)) (scale canvas :height))
        r (-> node
              (.GetFixtureList)
              (.GetShape)
              (.-m_radius)
              (* (scale canvas :width)))]
    [x y r]))

(defn get-nodes [world]
  (loop [node (.GetBodyList world)
         nodes ()]
    (if-not node
      nodes
      (if (.GetFixtureList node)
        (recur (.GetNext node) (cons node nodes))
        (recur (.GetNext node) nodes)))))

(defn distance-to [pt1 pt2]
  (sqrt (apply + (map square (map - pt1 pt2)))))

(defn click-in-circ? [click-point node]
  (let [[x y r] (get-draw-args node)]
    (< (distance-to click-point [x y]) r)))

(defn get-circle-at [pt]
  (first (filter (partial click-in-circ? pt) (get-nodes world))))

(.addEventListener
 canvas
 "mousedown"
 (fn [e]
   (let [x (.-pageX e)
         y (.-pageY e)
         circle (get-circle-at [x y])]
     (when circle
       (if (contains? @selected circle) (reset! selected #{}) (swap! selected conj circle))
       (when (= (count @selected) 2)
         (if (contains? @pairs @selected)
           (swap! pairs disj @selected)
           (swap! pairs conj @selected))
         (reset! selected #{}))))))

(defn update []
  (.Step world (/ 1 60) 10, 10)
  (.clearRect ctx 0 0 1000 1000)
  (draw-all! (get-nodes world))
  (.ClearForces world)
  (process-pairs! @pairs)
  (js/requestAnimFrame update))


(defn init []
  (let [dynamics      (.-Dynamics js/Box2D)
        collision     (.-Collision js/Box2D)
        shapes        (.-Shapes collision)
        b2body-def    (.-b2BodyDef dynamics)
        b2body        (.-b2Body dynamics)
        b2fixture-def (.-b2FixtureDef dynamics)
        b2fixture     (.-b2Fixture dynamics)
        b2world       (.-b2World dynamics)
        b2circle      (.-b2CircleShape shapes)
        b2poly        (.-b2PolygonShape shapes)
        b2contact-listner (.-b2ContactListener dynamics)
        fix-def       (new b2fixture-def)
        body-def      (new b2body-def)
        position      (.-position body-def)]
    
    (def world (new b2world (b2vec 0 0) true))
    (set! (.-density fix-def) 1)
    (set! (.-friction fix-def) FRICTION)
    (set! (.-restitution fix-def) RESTITUTION)
    
    (let [contact-listener (.-b2ContactListener dynamics)
          listener (new contact-listener)]
      (set! (.-BeginContact listener)
            (fn [c]
              (when (types-match? c)
                (play (.GetShape (.GetFixtureA c)))
                (play (.GetShape (.GetFixtureB c))))))
      (.SetContactListener world listener))

    (set! (.-type body-def) (.-b2_staticBody b2body))
    (set! (.-shape fix-def) (new b2poly))
    
    (let [wall-map {:x      [(/ SCALE 2) (+ SCALE 1) (/ SCALE 2) -1]
                    :y      [(+ SCALE 1) (/ SCALE 2) -1 (/ SCALE 2)]
                    :width  [(/ SCALE 2) 1 (/ SCALE 2) 1]
                    :height [1 (/ SCALE 2) 1 (/ SCALE 2)]
                    }]
      (loop [n 0]
        (when (< n 4)
          (set! (.-x position) (nth (wall-map :x) n))
          (set! (.-y position) (nth (wall-map :y) n))
          (.SetAsBox (.-shape fix-def)
                     (nth (wall-map :width) n)
                     (nth (wall-map :height) n))
          (.CreateFixture (.CreateBody world body-def) fix-def)
          (recur (inc n)))))
     
      (set! (.-type body-def) (.-b2_dynamicBody b2body))
      
      (loop [n 0]
        (if (< n NUM-CIRCLES)
          (do
            (set! (.-shape fix-def) (new b2circle (+ (* MAX-SIZE (rand)) 0.2)))
            (set! (.-x position) (rand-int SCALE))
            (set! (.-y position) (rand-int SCALE))
            (set! (.-linearVelocity body-def)
                  (b2vec (centered-rand-int MAX-INIT-VEL)
                       (centered-rand-int MAX-INIT-VEL)))
            (.CreateFixture (.CreateBody world body-def) fix-def)
            (recur (inc n)))))))


(init)
(js/requestAnimFrame update)
