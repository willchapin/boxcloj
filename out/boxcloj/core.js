// Compiled by ClojureScript 0.0-2014
goog.provide('boxcloj.core');
goog.require('cljs.core');
goog.require('boxcloj.maths');
goog.require('boxcloj.maths');
goog.require('clojure.string');
goog.require('clojure.string');
boxcloj.core.log = (function log(message){return console.log(message);
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
boxcloj.core.NUM_CIRCLES = 20;
boxcloj.core.MAX_SIZE = 3;
boxcloj.core.MAX_INIT_VEL = 5;
boxcloj.core.pair_list = cljs.core.atom.call(null,cljs.core.PersistentHashSet.EMPTY);
boxcloj.core.selected_circles = cljs.core.atom.call(null,cljs.core.PersistentHashSet.EMPTY);
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
boxcloj.core.paired_QMARK_ = (function paired_QMARK_(node){return cljs.core.some.call(null,(function (p1__5274_SHARP_){return cljs.core.contains_QMARK_.call(null,p1__5274_SHARP_,node);
}),cljs.core.deref.call(null,boxcloj.core.pair_list));
});
boxcloj.core.draw_all_BANG_ = (function draw_all_BANG_(nodes){var node = cljs.core.first.call(null,nodes);var nodes__$1 = cljs.core.rest.call(null,nodes);while(true){
if(cljs.core.truth_(node))
{if(cljs.core.truth_(boxcloj.core.paired_QMARK_.call(null,node)))
{boxcloj.core.color = "red";
} else
{boxcloj.core.color = "black";
}
boxcloj.core.draw_BANG_.call(null,boxcloj.core.color,boxcloj.core.get_draw_args.call(null,node));
{
var G__5275 = cljs.core.first.call(null,nodes__$1);
var G__5276 = cljs.core.rest.call(null,nodes__$1);
node = G__5275;
nodes__$1 = G__5276;
continue;
}
} else
{return null;
}
break;
}
});
boxcloj.core.draw_BANG_ = (function draw_BANG_(color,p__5277){var vec__5279 = p__5277;var x = cljs.core.nth.call(null,vec__5279,0,null);var y = cljs.core.nth.call(null,vec__5279,1,null);var r = cljs.core.nth.call(null,vec__5279,2,null);boxcloj.core.ctx.fillStyle = color;
boxcloj.core.ctx.lineWidth = 1;
boxcloj.core.ctx.strokeStyle = "#335588";
boxcloj.core.ctx.beginPath();
boxcloj.core.ctx.arc(x,y,r,0,(2 * Math.PI),false);
boxcloj.core.ctx.fill();
return boxcloj.core.ctx.stroke();
});
boxcloj.core.init = (function init(){var dynamics = Box2D.Dynamics;var collision = Box2D.Collision;var vec = Box2D.Common.Math.b2Vec2;var shapes = collision.Shapes;var b2body_def = dynamics.b2BodyDef;var b2body = dynamics.b2Body;var b2fixture_def = dynamics.b2FixtureDef;var b2fixture = dynamics.b2Fixture;var b2world = dynamics.b2World;var b2circle = shapes.b2CircleShape;var b2poly = shapes.b2PolygonShape;var b2contact_listner = dynamics.b2ContactListener;var fix_def = (new b2fixture_def());var body_def = (new b2body_def());var position = body_def.position;boxcloj.core.world = (new b2world((new vec(0,0)),true));
fix_def.density = 1;
fix_def.friction = 0;
fix_def.restitution = 1;
var contact_listener_5280 = dynamics.b2ContactListener;var listener_5281 = (new contact_listener_5280());listener_5281.BeginContact = (function (c){return null;
});
boxcloj.core.world.SetContactListener(listener_5281);
body_def.type = b2body.b2_staticBody;
fix_def.shape = (new b2poly());
var wall_map_5282 = cljs.core.PersistentArrayMap.fromArray([new cljs.core.Keyword(null,"x","x",1013904362),cljs.core.PersistentVector.fromArray([(boxcloj.core.SCALE / 2),(boxcloj.core.SCALE + 1),(boxcloj.core.SCALE / 2),-1], true),new cljs.core.Keyword(null,"y","y",1013904363),cljs.core.PersistentVector.fromArray([(boxcloj.core.SCALE + 1),(boxcloj.core.SCALE / 2),-1,(boxcloj.core.SCALE / 2)], true),new cljs.core.Keyword(null,"width","width",1127031096),cljs.core.PersistentVector.fromArray([(boxcloj.core.SCALE / 2),1,(boxcloj.core.SCALE / 2),1], true),new cljs.core.Keyword(null,"height","height",4087841945),cljs.core.PersistentVector.fromArray([1,(boxcloj.core.SCALE / 2),1,(boxcloj.core.SCALE / 2)], true)], true);var n_5283 = 0;while(true){
if((n_5283 < 4))
{position.x = cljs.core.nth.call(null,wall_map_5282.call(null,new cljs.core.Keyword(null,"x","x",1013904362)),n_5283);
position.y = cljs.core.nth.call(null,wall_map_5282.call(null,new cljs.core.Keyword(null,"y","y",1013904363)),n_5283);
fix_def.shape.SetAsBox(cljs.core.nth.call(null,wall_map_5282.call(null,new cljs.core.Keyword(null,"width","width",1127031096)),n_5283),cljs.core.nth.call(null,wall_map_5282.call(null,new cljs.core.Keyword(null,"height","height",4087841945)),n_5283));
boxcloj.core.world.CreateBody(body_def).CreateFixture(fix_def);
{
var G__5284 = (n_5283 + 1);
n_5283 = G__5284;
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
body_def.linearVelocity = (new vec(boxcloj.core.centered_rand_int.call(null,boxcloj.core.MAX_INIT_VEL),boxcloj.core.centered_rand_int.call(null,boxcloj.core.MAX_INIT_VEL)));
boxcloj.core.world.CreateBody(body_def).CreateFixture(fix_def);
{
var G__5285 = (n + 1);
n = G__5285;
continue;
}
} else
{return null;
}
break;
}
});
boxcloj.core.update = (function update(){boxcloj.core.world.Step((1 / 60),10,10);
boxcloj.core.ctx.clearRect(0,0,1000,1000);
boxcloj.core.draw_all_BANG_.call(null,boxcloj.core.get_nodes.call(null,boxcloj.core.world));
boxcloj.core.world.ClearForces();
return requestAnimFrame(update);
});
boxcloj.core.get_draw_args = (function get_draw_args(node){var x = (node.GetPosition().x * boxcloj.core.scale.call(null,boxcloj.core.canvas,new cljs.core.Keyword(null,"width","width",1127031096)));var y = (node.GetPosition().y * boxcloj.core.scale.call(null,boxcloj.core.canvas,new cljs.core.Keyword(null,"height","height",4087841945)));var r = (node.GetFixtureList().GetShape().m_radius * boxcloj.core.scale.call(null,boxcloj.core.canvas,new cljs.core.Keyword(null,"width","width",1127031096)));return cljs.core.PersistentVector.fromArray([x,y,r], true);
});
boxcloj.core.get_nodes = (function get_nodes(world){var node = world.GetBodyList();var nodes = cljs.core.List.EMPTY;while(true){
if(cljs.core.not.call(null,node))
{return nodes;
} else
{if(cljs.core.truth_(node.GetFixtureList()))
{{
var G__5286 = node.GetNext();
var G__5287 = cljs.core.cons.call(null,node,nodes);
node = G__5286;
nodes = G__5287;
continue;
}
} else
{{
var G__5288 = node.GetNext();
var G__5289 = nodes;
node = G__5288;
nodes = G__5289;
continue;
}
}
}
break;
}
});
boxcloj.core.distance_to = (function distance_to(pt1,pt2){return boxcloj.maths.sqrt.call(null,cljs.core.apply.call(null,cljs.core._PLUS_,cljs.core.map.call(null,boxcloj.maths.square,cljs.core.map.call(null,cljs.core._,pt1,pt2))));
});
boxcloj.core.click_in_circ_QMARK_ = (function click_in_circ_QMARK_(click_point,node){var vec__5291 = boxcloj.core.get_draw_args.call(null,node);var x = cljs.core.nth.call(null,vec__5291,0,null);var y = cljs.core.nth.call(null,vec__5291,1,null);var r = cljs.core.nth.call(null,vec__5291,2,null);return (boxcloj.core.distance_to.call(null,click_point,cljs.core.PersistentVector.fromArray([x,y], true)) < r);
});
boxcloj.core.circle_at = (function circle_at(pt){return cljs.core.first.call(null,cljs.core.filter.call(null,cljs.core.partial.call(null,boxcloj.core.click_in_circ_QMARK_,pt),boxcloj.core.get_nodes.call(null,boxcloj.core.world)));
});
boxcloj.core.canvas.addEventListener("mousedown",(function (e){var x = e.clientX;var y = e.clientY;var circle = boxcloj.core.circle_at.call(null,cljs.core.PersistentVector.fromArray([x,y], true));if(cljs.core.truth_(circle))
{if((cljs.core.count.call(null,cljs.core.deref.call(null,boxcloj.core.selected_circles)) < 2))
{cljs.core.swap_BANG_.call(null,boxcloj.core.selected_circles,cljs.core.conj,circle);
} else
{}
if(cljs.core._EQ_.call(null,cljs.core.count.call(null,cljs.core.deref.call(null,boxcloj.core.selected_circles)),2))
{cljs.core.swap_BANG_.call(null,boxcloj.core.pair_list,cljs.core.conj,cljs.core.deref.call(null,boxcloj.core.selected_circles));
return cljs.core.reset_BANG_.call(null,boxcloj.core.selected_circles,cljs.core.PersistentHashSet.EMPTY);
} else
{return null;
}
} else
{return null;
}
}));
boxcloj.core.print_pairs = (function print_pairs(pair_list){var pair = cljs.core.first.call(null,pair_list);var pairs = cljs.core.rest.call(null,pair_list);while(true){
if(cljs.core.truth_(pair))
{boxcloj.core.log.call(null,pair);
{
var G__5292 = cljs.core.first.call(null,pairs);
var G__5293 = cljs.core.rest.call(null,pairs);
pair = G__5292;
pairs = G__5293;
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