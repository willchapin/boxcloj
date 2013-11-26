// Compiled by ClojureScript 0.0-2014
goog.provide('boxcloj.core');
goog.require('cljs.core');
goog.require('boxcloj.maths');
goog.require('boxcloj.maths');
goog.require('clojure.string');
goog.require('clojure.string');
boxcloj.core.log = (function log(message){return console.log(message);
});
boxcloj.core.b2vec = (function b2vec(x,y){var vec = Box2D.Common.Math.b2Vec2;return (new vec(x,y));
});
boxcloj.core.rand_color = (function rand_color(){return [cljs.core.str("rgb("),cljs.core.str(clojure.string.join.call(null,",",cljs.core.take.call(null,3,cljs.core.repeatedly.call(null,(function (){return cljs.core.rand_int.call(null,255);
})))))].join('');
});
boxcloj.core.getAnimFrameType = (function getAnimFrameType(){var or__3128__auto__ = window.requestAnimationFrame;if(cljs.core.truth_(or__3128__auto__))
{return or__3128__auto__;
} else
{var or__3128__auto____$1 = window.webkitRequestAnimationFrame;if(cljs.core.truth_(or__3128__auto____$1))
{return or__3128__auto____$1;
} else
{var or__3128__auto____$2 = window.mozAnimationFrame;if(cljs.core.truth_(or__3128__auto____$2))
{return or__3128__auto____$2;
} else
{var or__3128__auto____$3 = window.oAnimationFrame;if(cljs.core.truth_(or__3128__auto____$3))
{return or__3128__auto____$3;
} else
{return window.msAnimationFrame;
}
}
}
}
});
boxcloj.core.setAnimFrame = (function setAnimFrame(){return window.requestAnimFrame = boxcloj.core.getAnimFrameType.call(null);
});
boxcloj.core.setAnimFrame.call(null);
boxcloj.core.types_match_QMARK_ = (function types_match_QMARK_(contact){return cljs.core._EQ_.call(null,contact.GetFixtureA().GetType(),contact.GetFixtureB().GetType());
});
boxcloj.core.play = (function play(shape){var r = shape.m_radius;return (new Audio(cljs.core.nth.call(null,boxcloj.core.notes,Math.floor((r * 2))))).play();
});
boxcloj.core.notes = cljs.core.PersistentVector.fromArray(["sounds/E5_wet.wav","sounds/C5_wet.wav","sounds/A4.wav","sounds/G4.wav","sounds/F4_wet.wav","sounds/D4.wav","sounds/Bb3.wav"], true);
boxcloj.core.canvas = document.getElementById("c");
boxcloj.core.ctx = boxcloj.core.canvas.getContext("2d");
boxcloj.core.SCALE = 30;
boxcloj.core.GRAVITY = 0.1;
boxcloj.core.NUM_CIRCLES = 5;
boxcloj.core.MAX_SIZE = 3;
boxcloj.core.MAX_INIT_VEL = 10;
boxcloj.core.RESTITUTION = 0.9;
boxcloj.core.FRICTION = 0.2;
boxcloj.core.pairs = cljs.core.atom.call(null,cljs.core.PersistentHashSet.EMPTY);
boxcloj.core.selected = cljs.core.atom.call(null,cljs.core.PersistentHashSet.EMPTY);
boxcloj.core.scale = (function scale(canvas,dim){boxcloj.core.height = (function height(){return (canvas.height / boxcloj.core.SCALE);
});
boxcloj.core.width = (function width(){return (canvas.width / boxcloj.core.SCALE);
});
if(cljs.core._EQ_.call(null,dim,new cljs.core.Keyword(null,"height","height",4087841945)))
{return boxcloj.core.height.call(null);
} else
{if(cljs.core._EQ_.call(null,dim,new cljs.core.Keyword(null,"width","width",1127031096)))
{return boxcloj.core.width.call(null);
} else
{return null;
}
}
});
boxcloj.core.centered_rand_int = (function centered_rand_int(n){return (cljs.core.rand_int.call(null,n) - (n / 2));
});
boxcloj.core.paired_QMARK_ = (function paired_QMARK_(node){return cljs.core.some.call(null,(function (p1__5137_SHARP_){return cljs.core.contains_QMARK_.call(null,p1__5137_SHARP_,node);
}),cljs.core.deref.call(null,boxcloj.core.pairs));
});
boxcloj.core.selected_QMARK_ = (function selected_QMARK_(node){return cljs.core.contains_QMARK_.call(null,cljs.core.deref.call(null,boxcloj.core.selected),node);
});
boxcloj.core.draw_all_BANG_ = (function draw_all_BANG_(nodes){var node = cljs.core.first.call(null,nodes);var nodes__$1 = cljs.core.rest.call(null,nodes);while(true){
if(cljs.core.truth_(node))
{if(cljs.core.truth_(boxcloj.core.selected_QMARK_.call(null,node)))
{boxcloj.core.color = "#333";
} else
{if(cljs.core.truth_(boxcloj.core.paired_QMARK_.call(null,node)))
{boxcloj.core.color = "#358";
} else
{boxcloj.core.color = "black";
}
}
boxcloj.core.draw_BANG_.call(null,boxcloj.core.color,boxcloj.core.get_draw_args.call(null,node));
{
var G__5138 = cljs.core.first.call(null,nodes__$1);
var G__5139 = cljs.core.rest.call(null,nodes__$1);
node = G__5138;
nodes__$1 = G__5139;
continue;
}
} else
{return null;
}
break;
}
});
boxcloj.core.draw_BANG_ = (function draw_BANG_(color,p__5140){var vec__5142 = p__5140;var x = cljs.core.nth.call(null,vec__5142,0,null);var y = cljs.core.nth.call(null,vec__5142,1,null);var r = cljs.core.nth.call(null,vec__5142,2,null);boxcloj.core.ctx.fillStyle = color;
boxcloj.core.ctx.lineWidth = 1;
boxcloj.core.ctx.strokeStyle = "#335588";
boxcloj.core.ctx.beginPath();
boxcloj.core.ctx.arc(x,y,r,0,(2 * Math.PI),false);
boxcloj.core.ctx.fill();
return boxcloj.core.ctx.stroke();
});
boxcloj.core.draw_from_to_BANG_ = (function draw_from_to_BANG_(x1,y1,x2,y2){boxcloj.core.ctx.lineWidth = 0.5;
boxcloj.core.ctx.strokeStyle = "aaa";
boxcloj.core.ctx.beginPath();
boxcloj.core.ctx.moveTo(x1,y1);
boxcloj.core.ctx.lineTo(x2,y2);
return boxcloj.core.ctx.stroke();
});
boxcloj.core.draw_connection_BANG_ = (function draw_connection_BANG_(pair){var vec__5146 = cljs.core.map.call(null,boxcloj.core.get_draw_args,pair);var vec__5147 = cljs.core.nth.call(null,vec__5146,0,null);var x1 = cljs.core.nth.call(null,vec__5147,0,null);var y1 = cljs.core.nth.call(null,vec__5147,1,null);var r1 = cljs.core.nth.call(null,vec__5147,2,null);var vec__5148 = cljs.core.nth.call(null,vec__5146,1,null);var x2 = cljs.core.nth.call(null,vec__5148,0,null);var y2 = cljs.core.nth.call(null,vec__5148,1,null);var r2 = cljs.core.nth.call(null,vec__5148,2,null);return boxcloj.core.draw_from_to_BANG_.call(null,x1,y1,x2,y2);
});
boxcloj.core.process_pairs_BANG_ = (function process_pairs_BANG_(pairs){var seq__5153 = cljs.core.seq.call(null,pairs);var chunk__5154 = null;var count__5155 = 0;var i__5156 = 0;while(true){
if((i__5156 < count__5155))
{var pair = cljs.core._nth.call(null,chunk__5154,i__5156);boxcloj.core.update_force_BANG_.call(null,pair);
boxcloj.core.draw_connection_BANG_.call(null,pair);
{
var G__5157 = seq__5153;
var G__5158 = chunk__5154;
var G__5159 = count__5155;
var G__5160 = (i__5156 + 1);
seq__5153 = G__5157;
chunk__5154 = G__5158;
count__5155 = G__5159;
i__5156 = G__5160;
continue;
}
} else
{var temp__4092__auto__ = cljs.core.seq.call(null,seq__5153);if(temp__4092__auto__)
{var seq__5153__$1 = temp__4092__auto__;if(cljs.core.chunked_seq_QMARK_.call(null,seq__5153__$1))
{var c__3844__auto__ = cljs.core.chunk_first.call(null,seq__5153__$1);{
var G__5161 = cljs.core.chunk_rest.call(null,seq__5153__$1);
var G__5162 = c__3844__auto__;
var G__5163 = cljs.core.count.call(null,c__3844__auto__);
var G__5164 = 0;
seq__5153 = G__5161;
chunk__5154 = G__5162;
count__5155 = G__5163;
i__5156 = G__5164;
continue;
}
} else
{var pair = cljs.core.first.call(null,seq__5153__$1);boxcloj.core.update_force_BANG_.call(null,pair);
boxcloj.core.draw_connection_BANG_.call(null,pair);
{
var G__5165 = cljs.core.next.call(null,seq__5153__$1);
var G__5166 = null;
var G__5167 = 0;
var G__5168 = 0;
seq__5153 = G__5165;
chunk__5154 = G__5166;
count__5155 = G__5167;
i__5156 = G__5168;
continue;
}
}
} else
{return null;
}
}
break;
}
});
boxcloj.core.update_force_BANG_ = (function update_force_BANG_(pair){var vec__5178 = cljs.core.map.call(null,boxcloj.core.get_draw_args,pair);var vec__5179 = cljs.core.nth.call(null,vec__5178,0,null);var x1 = cljs.core.nth.call(null,vec__5179,0,null);var y1 = cljs.core.nth.call(null,vec__5179,1,null);var r1 = cljs.core.nth.call(null,vec__5179,2,null);var vec__5180 = cljs.core.nth.call(null,vec__5178,1,null);var x2 = cljs.core.nth.call(null,vec__5180,0,null);var y2 = cljs.core.nth.call(null,vec__5180,1,null);var r2 = cljs.core.nth.call(null,vec__5180,2,null);var vecs = cljs.core.PersistentVector.fromArray([boxcloj.core.b2vec.call(null,(boxcloj.core.GRAVITY * (x2 - x1)),(boxcloj.core.GRAVITY * (y2 - y1))),boxcloj.core.b2vec.call(null,(boxcloj.core.GRAVITY * (x1 - x2)),(boxcloj.core.GRAVITY * (y1 - y2)))], true);var seq__5181 = cljs.core.seq.call(null,cljs.core.map.call(null,cljs.core.list,pair,vecs));var chunk__5182 = null;var count__5183 = 0;var i__5184 = 0;while(true){
if((i__5184 < count__5183))
{var vec__5185 = cljs.core._nth.call(null,chunk__5182,i__5184);var body = cljs.core.nth.call(null,vec__5185,0,null);var velocity = cljs.core.nth.call(null,vec__5185,1,null);body.ApplyForce(velocity,body.GetWorldCenter());
{
var G__5187 = seq__5181;
var G__5188 = chunk__5182;
var G__5189 = count__5183;
var G__5190 = (i__5184 + 1);
seq__5181 = G__5187;
chunk__5182 = G__5188;
count__5183 = G__5189;
i__5184 = G__5190;
continue;
}
} else
{var temp__4092__auto__ = cljs.core.seq.call(null,seq__5181);if(temp__4092__auto__)
{var seq__5181__$1 = temp__4092__auto__;if(cljs.core.chunked_seq_QMARK_.call(null,seq__5181__$1))
{var c__3844__auto__ = cljs.core.chunk_first.call(null,seq__5181__$1);{
var G__5191 = cljs.core.chunk_rest.call(null,seq__5181__$1);
var G__5192 = c__3844__auto__;
var G__5193 = cljs.core.count.call(null,c__3844__auto__);
var G__5194 = 0;
seq__5181 = G__5191;
chunk__5182 = G__5192;
count__5183 = G__5193;
i__5184 = G__5194;
continue;
}
} else
{var vec__5186 = cljs.core.first.call(null,seq__5181__$1);var body = cljs.core.nth.call(null,vec__5186,0,null);var velocity = cljs.core.nth.call(null,vec__5186,1,null);body.ApplyForce(velocity,body.GetWorldCenter());
{
var G__5195 = cljs.core.next.call(null,seq__5181__$1);
var G__5196 = null;
var G__5197 = 0;
var G__5198 = 0;
seq__5181 = G__5195;
chunk__5182 = G__5196;
count__5183 = G__5197;
i__5184 = G__5198;
continue;
}
}
} else
{return null;
}
}
break;
}
});
boxcloj.core.get_draw_args = (function get_draw_args(node){var x = (node.GetPosition().x * boxcloj.core.scale.call(null,boxcloj.core.canvas,new cljs.core.Keyword(null,"width","width",1127031096)));var y = (node.GetPosition().y * boxcloj.core.scale.call(null,boxcloj.core.canvas,new cljs.core.Keyword(null,"height","height",4087841945)));var r = (node.GetFixtureList().GetShape().m_radius * boxcloj.core.scale.call(null,boxcloj.core.canvas,new cljs.core.Keyword(null,"width","width",1127031096)));return cljs.core.PersistentVector.fromArray([x,y,r], true);
});
boxcloj.core.get_nodes = (function get_nodes(world){var node = world.GetBodyList();var nodes = cljs.core.List.EMPTY;while(true){
if(cljs.core.not.call(null,node))
{return nodes;
} else
{if(cljs.core.truth_(node.GetFixtureList()))
{{
var G__5199 = node.GetNext();
var G__5200 = cljs.core.cons.call(null,node,nodes);
node = G__5199;
nodes = G__5200;
continue;
}
} else
{{
var G__5201 = node.GetNext();
var G__5202 = nodes;
node = G__5201;
nodes = G__5202;
continue;
}
}
}
break;
}
});
boxcloj.core.distance_to = (function distance_to(pt1,pt2){return boxcloj.maths.sqrt.call(null,cljs.core.apply.call(null,cljs.core._PLUS_,cljs.core.map.call(null,boxcloj.maths.square,cljs.core.map.call(null,cljs.core._,pt1,pt2))));
});
boxcloj.core.click_in_circ_QMARK_ = (function click_in_circ_QMARK_(click_point,node){var vec__5204 = boxcloj.core.get_draw_args.call(null,node);var x = cljs.core.nth.call(null,vec__5204,0,null);var y = cljs.core.nth.call(null,vec__5204,1,null);var r = cljs.core.nth.call(null,vec__5204,2,null);return (boxcloj.core.distance_to.call(null,click_point,cljs.core.PersistentVector.fromArray([x,y], true)) < r);
});
boxcloj.core.get_circle_at = (function get_circle_at(pt){return cljs.core.first.call(null,cljs.core.filter.call(null,cljs.core.partial.call(null,boxcloj.core.click_in_circ_QMARK_,pt),boxcloj.core.get_nodes.call(null,boxcloj.core.world)));
});
boxcloj.core.canvas.addEventListener("mousedown",(function (e){var x = e.pageX;var y = e.pageY;var circle = boxcloj.core.get_circle_at.call(null,cljs.core.PersistentVector.fromArray([x,y], true));if(cljs.core.truth_(circle))
{if(cljs.core.contains_QMARK_.call(null,cljs.core.deref.call(null,boxcloj.core.selected),circle))
{cljs.core.reset_BANG_.call(null,boxcloj.core.selected,cljs.core.PersistentHashSet.EMPTY);
} else
{cljs.core.swap_BANG_.call(null,boxcloj.core.selected,cljs.core.conj,circle);
}
if(cljs.core._EQ_.call(null,cljs.core.count.call(null,cljs.core.deref.call(null,boxcloj.core.selected)),2))
{if(cljs.core.contains_QMARK_.call(null,cljs.core.deref.call(null,boxcloj.core.pairs),cljs.core.deref.call(null,boxcloj.core.selected)))
{cljs.core.swap_BANG_.call(null,boxcloj.core.pairs,cljs.core.disj,cljs.core.deref.call(null,boxcloj.core.selected));
} else
{cljs.core.swap_BANG_.call(null,boxcloj.core.pairs,cljs.core.conj,cljs.core.deref.call(null,boxcloj.core.selected));
}
return cljs.core.reset_BANG_.call(null,boxcloj.core.selected,cljs.core.PersistentHashSet.EMPTY);
} else
{return null;
}
} else
{return null;
}
}));
boxcloj.core.update = (function update(){boxcloj.core.world.Step((1 / 60),10,10);
boxcloj.core.ctx.clearRect(0,0,1000,1000);
boxcloj.core.draw_all_BANG_.call(null,boxcloj.core.get_nodes.call(null,boxcloj.core.world));
boxcloj.core.world.ClearForces();
boxcloj.core.process_pairs_BANG_.call(null,cljs.core.deref.call(null,boxcloj.core.pairs));
return requestAnimFrame(update);
});
boxcloj.core.init = (function init(){var dynamics = Box2D.Dynamics;var collision = Box2D.Collision;var shapes = collision.Shapes;var b2body_def = dynamics.b2BodyDef;var b2body = dynamics.b2Body;var b2fixture_def = dynamics.b2FixtureDef;var b2fixture = dynamics.b2Fixture;var b2world = dynamics.b2World;var b2circle = shapes.b2CircleShape;var b2poly = shapes.b2PolygonShape;var b2contact_listner = dynamics.b2ContactListener;var fix_def = (new b2fixture_def());var body_def = (new b2body_def());var position = body_def.position;boxcloj.core.world = (new b2world(boxcloj.core.b2vec.call(null,0,0),true));
fix_def.density = 1;
fix_def.friction = boxcloj.core.FRICTION;
fix_def.restitution = boxcloj.core.RESTITUTION;
var contact_listener_5205 = dynamics.b2ContactListener;var listener_5206 = (new contact_listener_5205());listener_5206.BeginContact = (function (c){if(cljs.core.truth_(boxcloj.core.types_match_QMARK_.call(null,c)))
{boxcloj.core.play.call(null,c.GetFixtureA().GetShape());
return boxcloj.core.play.call(null,c.GetFixtureB().GetShape());
} else
{return null;
}
});
boxcloj.core.world.SetContactListener(listener_5206);
body_def.type = b2body.b2_staticBody;
fix_def.shape = (new b2poly());
var wall_map_5207 = cljs.core.PersistentArrayMap.fromArray([new cljs.core.Keyword(null,"x","x",1013904362),cljs.core.PersistentVector.fromArray([(boxcloj.core.SCALE / 2),(boxcloj.core.SCALE + 1),(boxcloj.core.SCALE / 2),-1], true),new cljs.core.Keyword(null,"y","y",1013904363),cljs.core.PersistentVector.fromArray([(boxcloj.core.SCALE + 1),(boxcloj.core.SCALE / 2),-1,(boxcloj.core.SCALE / 2)], true),new cljs.core.Keyword(null,"width","width",1127031096),cljs.core.PersistentVector.fromArray([(boxcloj.core.SCALE / 2),1,(boxcloj.core.SCALE / 2),1], true),new cljs.core.Keyword(null,"height","height",4087841945),cljs.core.PersistentVector.fromArray([1,(boxcloj.core.SCALE / 2),1,(boxcloj.core.SCALE / 2)], true)], true);var n_5208 = 0;while(true){
if((n_5208 < 4))
{position.x = cljs.core.nth.call(null,wall_map_5207.call(null,new cljs.core.Keyword(null,"x","x",1013904362)),n_5208);
position.y = cljs.core.nth.call(null,wall_map_5207.call(null,new cljs.core.Keyword(null,"y","y",1013904363)),n_5208);
fix_def.shape.SetAsBox(cljs.core.nth.call(null,wall_map_5207.call(null,new cljs.core.Keyword(null,"width","width",1127031096)),n_5208),cljs.core.nth.call(null,wall_map_5207.call(null,new cljs.core.Keyword(null,"height","height",4087841945)),n_5208));
boxcloj.core.world.CreateBody(body_def).CreateFixture(fix_def);
{
var G__5209 = (n_5208 + 1);
n_5208 = G__5209;
continue;
}
} else
{}
break;
}
body_def.type = b2body.b2_dynamicBody;
var n = 0;while(true){
if((n < boxcloj.core.NUM_CIRCLES))
{fix_def.shape = (new b2circle(((boxcloj.core.MAX_SIZE * cljs.core.rand.call(null)) + 0.2)));
position.x = cljs.core.rand_int.call(null,boxcloj.core.SCALE);
position.y = cljs.core.rand_int.call(null,boxcloj.core.SCALE);
body_def.linearVelocity = boxcloj.core.b2vec.call(null,boxcloj.core.centered_rand_int.call(null,boxcloj.core.MAX_INIT_VEL),boxcloj.core.centered_rand_int.call(null,boxcloj.core.MAX_INIT_VEL));
boxcloj.core.world.CreateBody(body_def).CreateFixture(fix_def);
{
var G__5210 = (n + 1);
n = G__5210;
continue;
}
} else
{return null;
}
break;
}
});
boxcloj.core.init.call(null);
requestAnimFrame(boxcloj.core.update);

//# sourceMappingURL=core.js.map