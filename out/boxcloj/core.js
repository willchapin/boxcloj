goog.provide('boxcloj.core');
goog.require('cljs.core');
goog.require('clojure.string');
goog.require('clojure.string');
boxcloj.core.log = (function log(message){return console.log(message);
});
boxcloj.core.rand_color = (function rand_color(){return [cljs.core.str("rgb("),cljs.core.str(clojure.string.join.call(null,",",cljs.core.take.call(null,3,cljs.core.repeatedly.call(null,(function (){return cljs.core.rand_int.call(null,255);
})))))].join('');
});
boxcloj.core.getAnimFrameType = (function getAnimFrameType(){var or__2961__auto__ = window.requestAnimationFrame;if(cljs.core.truth_(or__2961__auto__))
{return or__2961__auto__;
} else
{var or__2961__auto____$1 = window.webkitRequestAnimationFrame;if(cljs.core.truth_(or__2961__auto____$1))
{return or__2961__auto____$1;
} else
{var or__2961__auto____$2 = window.mozAnimationFrame;if(cljs.core.truth_(or__2961__auto____$2))
{return or__2961__auto____$2;
} else
{var or__2961__auto____$3 = window.oAnimationFrame;if(cljs.core.truth_(or__2961__auto____$3))
{return or__2961__auto____$3;
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
boxcloj.core.NUM_CIRCLES = 40;
boxcloj.core.MAX_SIZE = 2;
boxcloj.core.MAX_INIT_VEL = 5;
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
boxcloj.core.draw_all_BANG_ = (function draw_all_BANG_(args){var G__4825 = cljs.core.first.call(null,args);var vec__4826 = G__4825;var x = cljs.core.nth.call(null,vec__4826,0,null);var y = cljs.core.nth.call(null,vec__4826,1,null);var r = cljs.core.nth.call(null,vec__4826,2,null);var cdr = cljs.core.rest.call(null,args);var G__4825__$1 = G__4825;var cdr__$1 = cdr;while(true){
var vec__4827 = G__4825__$1;var x__$1 = cljs.core.nth.call(null,vec__4827,0,null);var y__$1 = cljs.core.nth.call(null,vec__4827,1,null);var r__$1 = cljs.core.nth.call(null,vec__4827,2,null);var cdr__$2 = cdr__$1;boxcloj.core.ctx.fillStyle = "black";
boxcloj.core.ctx.lineWidth = 1;
boxcloj.core.ctx.strokeStyle = "#335588";
boxcloj.core.ctx.beginPath();
boxcloj.core.ctx.arc(x__$1,y__$1,r__$1,0,(2 * Math.PI),false);
boxcloj.core.ctx.fill();
boxcloj.core.ctx.stroke();
if(!(cljs.core.empty_QMARK_.call(null,cdr__$2)))
{{
var G__4828 = cljs.core.first.call(null,cdr__$2);
var G__4829 = cljs.core.rest.call(null,cdr__$2);
G__4825__$1 = G__4828;
cdr__$1 = G__4829;
continue;
}
} else
{return null;
}
break;
}
});
boxcloj.core.init = (function init(){var dynamics = Box2D.Dynamics;var collision = Box2D.Collision;var vec = Box2D.Common.Math.b2Vec2;var shapes = collision.Shapes;var b2body_def = dynamics.b2BodyDef;var b2body = dynamics.b2Body;var b2fixture_def = dynamics.b2FixtureDef;var b2fixture = dynamics.b2Fixture;var b2world = dynamics.b2World;var b2circle = shapes.b2CircleShape;var b2contact_listner = dynamics.b2ContactListener;var fix_def = (new b2fixture_def());var body_def = (new b2body_def());var position = body_def.position;boxcloj.core.world = (new b2world((new vec(0,0)),true));
var contact_listener_4830 = dynamics.b2ContactListener;var listener_4831 = (new contact_listener_4830());listener_4831.BeginContact = (function (c){return null;
});
boxcloj.core.world.SetContactListener(listener_4831);
body_def.type = b2body.b2_dynamicBody;
var n = 0;while(true){
if((n < boxcloj.core.NUM_CIRCLES))
{fix_def.shape = (new b2circle(((boxcloj.core.MAX_SIZE * cljs.core.rand.call(null)) + 0.2)));
position.x = cljs.core.rand_int.call(null,boxcloj.core.SCALE);
position.y = cljs.core.rand_int.call(null,boxcloj.core.SCALE);
body_def.linearVelocity = (new vec(boxcloj.core.centered_rand_int.call(null,boxcloj.core.MAX_INIT_VEL),boxcloj.core.centered_rand_int.call(null,boxcloj.core.MAX_INIT_VEL)));
boxcloj.core.world.CreateBody(body_def).CreateFixture(fix_def);
{
var G__4832 = (n + 1);
n = G__4832;
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
boxcloj.core.init.call(null);
requestAnimFrame(boxcloj.core.update);
boxcloj.core.get_nodes = (function get_nodes(world){var node = world.GetBodyList();var nodes = cljs.core.List.EMPTY;while(true){
if(cljs.core.not.call(null,node))
{return nodes;
} else
{if(cljs.core.truth_(node.GetFixtureList()))
{{
var G__4833 = node.GetNext();
var G__4834 = cljs.core.cons.call(null,node,nodes);
node = G__4833;
nodes = G__4834;
continue;
}
} else
{{
var G__4835 = node.GetNext();
var G__4836 = nodes;
node = G__4835;
nodes = G__4836;
continue;
}
}
}
break;
}
});

//@ sourceMappingURL=core.js.map