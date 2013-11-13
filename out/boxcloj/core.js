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
boxcloj.core.canvas = document.getElementById("c");
boxcloj.core.ctx = boxcloj.core.canvas.getContext("2d");
boxcloj.core.SCALE = 30;
boxcloj.core.GRAVITY = 0.1;
boxcloj.core.NUM_CIRCLES = 15;
boxcloj.core.MAX_SIZE = 3;
boxcloj.core.MAX_INIT_VEL = 10;
boxcloj.core.RESTITUTION = 0.8;
boxcloj.core.FRICTION = 0.5;
boxcloj.core.pairs = cljs.core.atom.call(null,cljs.core.PersistentHashSet.EMPTY);
boxcloj.core.selected = cljs.core.atom.call(null,cljs.core.PersistentHashSet.EMPTY);
boxcloj.core.to_remove = cljs.core.atom.call(null,cljs.core.PersistentHashSet.EMPTY);
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
boxcloj.core.paired_QMARK_ = (function paired_QMARK_(node){return cljs.core.some.call(null,(function (p1__5918_SHARP_){return cljs.core.contains_QMARK_.call(null,p1__5918_SHARP_,node);
}),cljs.core.deref.call(null,boxcloj.core.pairs));
});
boxcloj.core.selected_QMARK_ = (function selected_QMARK_(node){return cljs.core.contains_QMARK_.call(null,cljs.core.deref.call(null,boxcloj.core.selected),node);
});
boxcloj.core.draw_all_BANG_ = (function draw_all_BANG_(nodes){var node = cljs.core.first.call(null,nodes);var nodes__$1 = cljs.core.rest.call(null,nodes);while(true){
if(cljs.core.truth_(node))
{if(cljs.core.contains_QMARK_.call(null,cljs.core.deref.call(null,boxcloj.core.to_remove),node))
{boxcloj.core.color = "#662222";
} else
{if(cljs.core.truth_(boxcloj.core.paired_QMARK_.call(null,node)))
{boxcloj.core.color = "#995522";
} else
{if(cljs.core.truth_(boxcloj.core.selected_QMARK_.call(null,node)))
{boxcloj.core.color = "#666";
} else
{boxcloj.core.color = "black";
}
}
}
boxcloj.core.draw_BANG_.call(null,boxcloj.core.color,boxcloj.core.get_draw_args.call(null,node));
{
var G__5919 = cljs.core.first.call(null,nodes__$1);
var G__5920 = cljs.core.rest.call(null,nodes__$1);
node = G__5919;
nodes__$1 = G__5920;
continue;
}
} else
{return null;
}
break;
}
});
boxcloj.core.draw_BANG_ = (function draw_BANG_(color,p__5921){var vec__5923 = p__5921;var x = cljs.core.nth.call(null,vec__5923,0,null);var y = cljs.core.nth.call(null,vec__5923,1,null);var r = cljs.core.nth.call(null,vec__5923,2,null);boxcloj.core.ctx.fillStyle = color;
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
boxcloj.core.draw_connection_BANG_ = (function draw_connection_BANG_(pair){var vec__5927 = cljs.core.map.call(null,boxcloj.core.get_draw_args,pair);var vec__5928 = cljs.core.nth.call(null,vec__5927,0,null);var x1 = cljs.core.nth.call(null,vec__5928,0,null);var y1 = cljs.core.nth.call(null,vec__5928,1,null);var r1 = cljs.core.nth.call(null,vec__5928,2,null);var vec__5929 = cljs.core.nth.call(null,vec__5927,1,null);var x2 = cljs.core.nth.call(null,vec__5929,0,null);var y2 = cljs.core.nth.call(null,vec__5929,1,null);var r2 = cljs.core.nth.call(null,vec__5929,2,null);return boxcloj.core.draw_from_to_BANG_.call(null,x1,y1,x2,y2);
});
boxcloj.core.process_pairs_BANG_ = (function process_pairs_BANG_(pairs){var seq__5934 = cljs.core.seq.call(null,pairs);var chunk__5935 = null;var count__5936 = 0;var i__5937 = 0;while(true){
if((i__5937 < count__5936))
{var pair = cljs.core._nth.call(null,chunk__5935,i__5937);boxcloj.core.update_force_BANG_.call(null,pair);
boxcloj.core.draw_connection_BANG_.call(null,pair);
{
var G__5938 = seq__5934;
var G__5939 = chunk__5935;
var G__5940 = count__5936;
var G__5941 = (i__5937 + 1);
seq__5934 = G__5938;
chunk__5935 = G__5939;
count__5936 = G__5940;
i__5937 = G__5941;
continue;
}
} else
{var temp__4092__auto__ = cljs.core.seq.call(null,seq__5934);if(temp__4092__auto__)
{var seq__5934__$1 = temp__4092__auto__;if(cljs.core.chunked_seq_QMARK_.call(null,seq__5934__$1))
{var c__3844__auto__ = cljs.core.chunk_first.call(null,seq__5934__$1);{
var G__5942 = cljs.core.chunk_rest.call(null,seq__5934__$1);
var G__5943 = c__3844__auto__;
var G__5944 = cljs.core.count.call(null,c__3844__auto__);
var G__5945 = 0;
seq__5934 = G__5942;
chunk__5935 = G__5943;
count__5936 = G__5944;
i__5937 = G__5945;
continue;
}
} else
{var pair = cljs.core.first.call(null,seq__5934__$1);boxcloj.core.update_force_BANG_.call(null,pair);
boxcloj.core.draw_connection_BANG_.call(null,pair);
{
var G__5946 = cljs.core.next.call(null,seq__5934__$1);
var G__5947 = null;
var G__5948 = 0;
var G__5949 = 0;
seq__5934 = G__5946;
chunk__5935 = G__5947;
count__5936 = G__5948;
i__5937 = G__5949;
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
boxcloj.core.update_force_BANG_ = (function update_force_BANG_(pair){var vec__5959 = cljs.core.map.call(null,boxcloj.core.get_draw_args,pair);var vec__5960 = cljs.core.nth.call(null,vec__5959,0,null);var x1 = cljs.core.nth.call(null,vec__5960,0,null);var y1 = cljs.core.nth.call(null,vec__5960,1,null);var r1 = cljs.core.nth.call(null,vec__5960,2,null);var vec__5961 = cljs.core.nth.call(null,vec__5959,1,null);var x2 = cljs.core.nth.call(null,vec__5961,0,null);var y2 = cljs.core.nth.call(null,vec__5961,1,null);var r2 = cljs.core.nth.call(null,vec__5961,2,null);var vecs = cljs.core.PersistentVector.fromArray([boxcloj.core.b2vec.call(null,(boxcloj.core.GRAVITY * (x2 - x1)),(boxcloj.core.GRAVITY * (y2 - y1))),boxcloj.core.b2vec.call(null,(boxcloj.core.GRAVITY * (x1 - x2)),(boxcloj.core.GRAVITY * (y1 - y2)))], true);var seq__5962 = cljs.core.seq.call(null,cljs.core.map.call(null,cljs.core.list,pair,vecs));var chunk__5963 = null;var count__5964 = 0;var i__5965 = 0;while(true){
if((i__5965 < count__5964))
{var vec__5966 = cljs.core._nth.call(null,chunk__5963,i__5965);var body = cljs.core.nth.call(null,vec__5966,0,null);var velocity = cljs.core.nth.call(null,vec__5966,1,null);body.ApplyForce(velocity,body.GetWorldCenter());
{
var G__5968 = seq__5962;
var G__5969 = chunk__5963;
var G__5970 = count__5964;
var G__5971 = (i__5965 + 1);
seq__5962 = G__5968;
chunk__5963 = G__5969;
count__5964 = G__5970;
i__5965 = G__5971;
continue;
}
} else
{var temp__4092__auto__ = cljs.core.seq.call(null,seq__5962);if(temp__4092__auto__)
{var seq__5962__$1 = temp__4092__auto__;if(cljs.core.chunked_seq_QMARK_.call(null,seq__5962__$1))
{var c__3844__auto__ = cljs.core.chunk_first.call(null,seq__5962__$1);{
var G__5972 = cljs.core.chunk_rest.call(null,seq__5962__$1);
var G__5973 = c__3844__auto__;
var G__5974 = cljs.core.count.call(null,c__3844__auto__);
var G__5975 = 0;
seq__5962 = G__5972;
chunk__5963 = G__5973;
count__5964 = G__5974;
i__5965 = G__5975;
continue;
}
} else
{var vec__5967 = cljs.core.first.call(null,seq__5962__$1);var body = cljs.core.nth.call(null,vec__5967,0,null);var velocity = cljs.core.nth.call(null,vec__5967,1,null);body.ApplyForce(velocity,body.GetWorldCenter());
{
var G__5976 = cljs.core.next.call(null,seq__5962__$1);
var G__5977 = null;
var G__5978 = 0;
var G__5979 = 0;
seq__5962 = G__5976;
chunk__5963 = G__5977;
count__5964 = G__5978;
i__5965 = G__5979;
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
var G__5980 = node.GetNext();
var G__5981 = cljs.core.cons.call(null,node,nodes);
node = G__5980;
nodes = G__5981;
continue;
}
} else
{{
var G__5982 = node.GetNext();
var G__5983 = nodes;
node = G__5982;
nodes = G__5983;
continue;
}
}
}
break;
}
});
boxcloj.core.distance_to = (function distance_to(pt1,pt2){return boxcloj.maths.sqrt.call(null,cljs.core.apply.call(null,cljs.core._PLUS_,cljs.core.map.call(null,boxcloj.maths.square,cljs.core.map.call(null,cljs.core._,pt1,pt2))));
});
boxcloj.core.click_in_circ_QMARK_ = (function click_in_circ_QMARK_(click_point,node){var vec__5985 = boxcloj.core.get_draw_args.call(null,node);var x = cljs.core.nth.call(null,vec__5985,0,null);var y = cljs.core.nth.call(null,vec__5985,1,null);var r = cljs.core.nth.call(null,vec__5985,2,null);return (boxcloj.core.distance_to.call(null,click_point,cljs.core.PersistentVector.fromArray([x,y], true)) < r);
});
boxcloj.core.get_circle_at = (function get_circle_at(pt){return cljs.core.first.call(null,cljs.core.filter.call(null,cljs.core.partial.call(null,boxcloj.core.click_in_circ_QMARK_,pt),boxcloj.core.get_nodes.call(null,boxcloj.core.world)));
});
boxcloj.core.canvas.addEventListener("mousedown",(function (e){var x = e.pageX;var y = e.pageY;var circle = boxcloj.core.get_circle_at.call(null,cljs.core.PersistentVector.fromArray([x,y], true));if(cljs.core.truth_(circle))
{if(cljs.core.contains_QMARK_.call(null,cljs.core.deref.call(null,boxcloj.core.selected),circle))
{cljs.core.reset_BANG_.call(null,boxcloj.core.selected,cljs.core.PersistentHashSet.EMPTY);
} else
{cljs.core.swap_BANG_.call(null,boxcloj.core.selected,cljs.core.conj,circle);
}
if(cljs.core.truth_(boxcloj.core.paired_QMARK_.call(null,circle)))
{cljs.core.swap_BANG_.call(null,boxcloj.core.to_remove,cljs.core.conj,circle);
} else
{}
if(cljs.core._EQ_.call(null,cljs.core.count.call(null,cljs.core.deref.call(null,boxcloj.core.selected)),2))
{if(cljs.core.contains_QMARK_.call(null,cljs.core.deref.call(null,boxcloj.core.pairs),cljs.core.deref.call(null,boxcloj.core.selected)))
{cljs.core.swap_BANG_.call(null,boxcloj.core.pairs,cljs.core.disj,cljs.core.deref.call(null,boxcloj.core.selected));
} else
{cljs.core.swap_BANG_.call(null,boxcloj.core.pairs,cljs.core.conj,cljs.core.deref.call(null,boxcloj.core.selected));
}
cljs.core.reset_BANG_.call(null,boxcloj.core.selected,cljs.core.PersistentHashSet.EMPTY);
return cljs.core.reset_BANG_.call(null,boxcloj.core.to_remove,cljs.core.PersistentHashSet.EMPTY);
} else
{return null;
}
} else
{cljs.core.reset_BANG_.call(null,boxcloj.core.selected,cljs.core.PersistentHashSet.EMPTY);
return cljs.core.reset_BANG_.call(null,boxcloj.core.to_remove,cljs.core.PersistentHashSet.EMPTY);
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
var contact_listener_5986 = dynamics.b2ContactListener;var listener_5987 = (new contact_listener_5986());listener_5987.BeginContact = (function (c){return cljs.core.List.EMPTY;
});
boxcloj.core.world.SetContactListener(listener_5987);
body_def.type = b2body.b2_staticBody;
fix_def.shape = (new b2poly());
var wall_map_5988 = cljs.core.PersistentArrayMap.fromArray([new cljs.core.Keyword(null,"x","x",1013904362),cljs.core.PersistentVector.fromArray([(boxcloj.core.SCALE / 2),(boxcloj.core.SCALE + 1),(boxcloj.core.SCALE / 2),-1], true),new cljs.core.Keyword(null,"y","y",1013904363),cljs.core.PersistentVector.fromArray([(boxcloj.core.SCALE + 1),(boxcloj.core.SCALE / 2),-1,(boxcloj.core.SCALE / 2)], true),new cljs.core.Keyword(null,"width","width",1127031096),cljs.core.PersistentVector.fromArray([(boxcloj.core.SCALE / 2),1,(boxcloj.core.SCALE / 2),1], true),new cljs.core.Keyword(null,"height","height",4087841945),cljs.core.PersistentVector.fromArray([1,(boxcloj.core.SCALE / 2),1,(boxcloj.core.SCALE / 2)], true)], true);var n_5989 = 0;while(true){
if((n_5989 < 4))
{position.x = cljs.core.nth.call(null,wall_map_5988.call(null,new cljs.core.Keyword(null,"x","x",1013904362)),n_5989);
position.y = cljs.core.nth.call(null,wall_map_5988.call(null,new cljs.core.Keyword(null,"y","y",1013904363)),n_5989);
fix_def.shape.SetAsBox(cljs.core.nth.call(null,wall_map_5988.call(null,new cljs.core.Keyword(null,"width","width",1127031096)),n_5989),cljs.core.nth.call(null,wall_map_5988.call(null,new cljs.core.Keyword(null,"height","height",4087841945)),n_5989));
boxcloj.core.world.CreateBody(body_def).CreateFixture(fix_def);
{
var G__5990 = (n_5989 + 1);
n_5989 = G__5990;
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
var G__5991 = (n + 1);
n = G__5991;
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