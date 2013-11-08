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
boxcloj.core.NUM_CIRCLES = 5;
boxcloj.core.MAX_SIZE = 4;
boxcloj.core.MAX_INIT_VEL = 3;
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
boxcloj.core.draw_all_BANG_ = (function draw_all_BANG_(args){var G__5959 = cljs.core.first.call(null,args);var vec__5960 = G__5959;var x = cljs.core.nth.call(null,vec__5960,0,null);var y = cljs.core.nth.call(null,vec__5960,1,null);var r = cljs.core.nth.call(null,vec__5960,2,null);var cdr = cljs.core.rest.call(null,args);var G__5959__$1 = G__5959;var cdr__$1 = cdr;while(true){
var vec__5961 = G__5959__$1;var x__$1 = cljs.core.nth.call(null,vec__5961,0,null);var y__$1 = cljs.core.nth.call(null,vec__5961,1,null);var r__$1 = cljs.core.nth.call(null,vec__5961,2,null);var cdr__$2 = cdr__$1;boxcloj.core.ctx.fillStyle = "black";
boxcloj.core.ctx.lineWidth = 1;
boxcloj.core.ctx.strokeStyle = "#335588";
boxcloj.core.ctx.beginPath();
boxcloj.core.ctx.arc(x__$1,y__$1,r__$1,0,(2 * Math.PI),false);
boxcloj.core.ctx.fill();
boxcloj.core.ctx.stroke();
if(!(cljs.core.empty_QMARK_.call(null,cdr__$2)))
{{
var G__5962 = cljs.core.first.call(null,cdr__$2);
var G__5963 = cljs.core.rest.call(null,cdr__$2);
G__5959__$1 = G__5962;
cdr__$1 = G__5963;
continue;
}
} else
{return null;
}
break;
}
});
boxcloj.core.init = (function init(){var dynamics = Box2D.Dynamics;var collision = Box2D.Collision;var vec = Box2D.Common.Math.b2Vec2;var shapes = collision.Shapes;var b2body_def = dynamics.b2BodyDef;var b2body = dynamics.b2Body;var b2fixture_def = dynamics.b2FixtureDef;var b2fixture = dynamics.b2Fixture;var b2world = dynamics.b2World;var b2circle = shapes.b2CircleShape;var b2poly = shapes.b2PolygonShape;var b2contact_listner = dynamics.b2ContactListener;var fix_def = (new b2fixture_def());var body_def = (new b2body_def());var position = body_def.position;boxcloj.core.world = (new b2world((new vec(0,0)),true));
fix_def.density = 1;
fix_def.friction = 0;
fix_def.restitution = 1;
var contact_listener_5964 = dynamics.b2ContactListener;var listener_5965 = (new contact_listener_5964());listener_5965.BeginContact = (function (c){return null;
});
boxcloj.core.world.SetContactListener(listener_5965);
body_def.type = b2body.b2_staticBody;
fix_def.shape = (new b2poly());
var wall_map_5966 = cljs.core.PersistentArrayMap.fromArray([new cljs.core.Keyword(null,"x","x",1013904362),cljs.core.PersistentVector.fromArray([(boxcloj.core.SCALE / 2),(boxcloj.core.SCALE + 1),(boxcloj.core.SCALE / 2),-1], true),new cljs.core.Keyword(null,"y","y",1013904363),cljs.core.PersistentVector.fromArray([(boxcloj.core.SCALE + 1),(boxcloj.core.SCALE / 2),-1,(boxcloj.core.SCALE / 2)], true),new cljs.core.Keyword(null,"width","width",1127031096),cljs.core.PersistentVector.fromArray([(boxcloj.core.SCALE / 2),1,(boxcloj.core.SCALE / 2),1], true),new cljs.core.Keyword(null,"height","height",4087841945),cljs.core.PersistentVector.fromArray([1,(boxcloj.core.SCALE / 2),1,(boxcloj.core.SCALE / 2)], true)], true);var n_5967 = 0;while(true){
if((n_5967 < 4))
{position.x = cljs.core.nth.call(null,wall_map_5966.call(null,new cljs.core.Keyword(null,"x","x",1013904362)),n_5967);
position.y = cljs.core.nth.call(null,wall_map_5966.call(null,new cljs.core.Keyword(null,"y","y",1013904363)),n_5967);
fix_def.shape.SetAsBox(cljs.core.nth.call(null,wall_map_5966.call(null,new cljs.core.Keyword(null,"width","width",1127031096)),n_5967),cljs.core.nth.call(null,wall_map_5966.call(null,new cljs.core.Keyword(null,"height","height",4087841945)),n_5967));
boxcloj.core.world.CreateBody(body_def).CreateFixture(fix_def);
{
var G__5968 = (n_5967 + 1);
n_5967 = G__5968;
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
var G__5969 = (n + 1);
n = G__5969;
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
boxcloj.core.draw_all_BANG_.call(null,cljs.core.map.call(null,boxcloj.core.get_draw_args,boxcloj.core.get_nodes.call(null,boxcloj.core.world)));
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
var G__5970 = node.GetNext();
var G__5971 = cljs.core.cons.call(null,node,nodes);
node = G__5970;
nodes = G__5971;
continue;
}
} else
{{
var G__5972 = node.GetNext();
var G__5973 = nodes;
node = G__5972;
nodes = G__5973;
continue;
}
}
}
break;
}
});
boxcloj.core.distance_to = (function distance_to(pt1,pt2){return boxcloj.maths.sqrt.call(null,cljs.core.apply.call(null,cljs.core._PLUS_,cljs.core.map.call(null,boxcloj.maths.square,cljs.core.map.call(null,cljs.core._,pt1,pt2))));
});
boxcloj.core.click_in_circ_QMARK_ = (function click_in_circ_QMARK_(click_point,node){var vec__5975 = boxcloj.core.get_draw_args.call(null,node);var x = cljs.core.nth.call(null,vec__5975,0,null);var y = cljs.core.nth.call(null,vec__5975,1,null);var r = cljs.core.nth.call(null,vec__5975,2,null);return (boxcloj.core.distance_to.call(null,click_point,cljs.core.PersistentVector.fromArray([x,y], true)) < r);
});
boxcloj.core.circle_at = (function circle_at(pt){return boxcloj.core.log.call(null,cljs.core.first.call(null,cljs.core.filter.call(null,cljs.core.partial.call(null,boxcloj.core.click_in_circ_QMARK_,pt),boxcloj.core.get_nodes.call(null,boxcloj.core.world))));
});
boxcloj.core.canvas.addEventListener("mousedown",(function (e){var x = e.clientX;var y = e.clientY;var circle = boxcloj.core.circle_at.call(null,cljs.core.PersistentVector.fromArray([x,y], true));return null;
}));
boxcloj.core.init.call(null);
requestAnimFrame(boxcloj.core.update);

//# sourceMappingURL=core.js.map