goog.provide('boxcloj.core');
goog.require('cljs.core');
boxcloj.core.log = (function log(message){return console.log(message);
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
boxcloj.core.NUM_CIRCLES = 50;
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
boxcloj.core.draw = (function draw(args){var vec__4775 = args;var x = cljs.core.nth.call(null,vec__4775,0,null);var y = cljs.core.nth.call(null,vec__4775,1,null);var r = cljs.core.nth.call(null,vec__4775,2,null);boxcloj.core.ctx.beginPath();
boxcloj.core.ctx.arc(x,y,r,0,(2 * Math.PI),false);
boxcloj.core.ctx.fillStyle = "black";
boxcloj.core.ctx.fill();
boxcloj.core.ctx.lineWidth = 1;
boxcloj.core.ctx.strokeStyle = "#335588";
return boxcloj.core.ctx.stroke();
});
boxcloj.core.init = (function init(){var dynamics = Box2D.Dynamics;var collision = Box2D.Collision;var vec = Box2D.Common.Math.b2Vec2;var shapes = collision.Shapes;var b2body_def = dynamics.b2BodyDef;var b2body = dynamics.b2Body;var b2fixture_def = dynamics.b2FixtureDef;var b2fixture = dynamics.b2Fixture;var b2world = dynamics.b2World;var b2circle = shapes.b2CircleShape;var fix_def = (new b2fixture_def());var body_def = (new b2body_def());var position = body_def.position;boxcloj.core.world = (new b2world((new vec(0,0)),true));
body_def.type = b2body.b2_dynamicBody;
var n = 0;while(true){
if((n < boxcloj.core.NUM_CIRCLES))
{fix_def.shape = (new b2circle((0.3 + cljs.core.rand.call(null))));
position.x = cljs.core.rand_int.call(null,30);
position.y = cljs.core.rand_int.call(null,30);
body_def.linearVelocity = (new vec(boxcloj.core.centered_rand_int.call(null,4),boxcloj.core.centered_rand_int.call(null,4)));
boxcloj.core.world.CreateBody(body_def).CreateFixture(fix_def);
{
var G__4776 = (n + 1);
n = G__4776;
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
var node_4777 = boxcloj.core.world.GetBodyList();while(true){
if(cljs.core.truth_(node_4777))
{if(cljs.core.truth_(node_4777.GetFixtureList()))
{boxcloj.core.draw.call(null,boxcloj.core.get_draw_args.call(null,node_4777));
} else
{}
{
var G__4778 = node_4777.GetNext();
node_4777 = G__4778;
continue;
}
} else
{}
break;
}
boxcloj.core.world.ClearForces();
return requestAnimFrame(update);
});
boxcloj.core.get_draw_args = (function get_draw_args(node){var x = (node.GetPosition().x * boxcloj.core.scale.call(null,boxcloj.core.canvas,new cljs.core.Keyword(null,"width","width",1127031096)));var y = (node.GetPosition().y * boxcloj.core.scale.call(null,boxcloj.core.canvas,new cljs.core.Keyword(null,"height","height",4087841945)));var r = (node.GetFixtureList().GetShape().m_radius * boxcloj.core.scale.call(null,boxcloj.core.canvas,new cljs.core.Keyword(null,"width","width",1127031096)));return cljs.core.PersistentVector.fromArray([x,y,r], true);
});
boxcloj.core.init.call(null);
requestAnimFrame(boxcloj.core.update);

//@ sourceMappingURL=core.js.map