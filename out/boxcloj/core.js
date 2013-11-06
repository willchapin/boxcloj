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
boxcloj.core.draw = (function draw(x,y){boxcloj.core.log.call(null,[cljs.core.str(x),cljs.core.str("  "),cljs.core.str(y)].join(''));
boxcloj.core.ctx.beginPath();
boxcloj.core.ctx.arc(x,y,100,0,(2 * Math.PI),false);
boxcloj.core.ctx.fillStyle = "black";
boxcloj.core.ctx.fill();
boxcloj.core.ctx.lineWidth = 1;
boxcloj.core.ctx.strokeStyle = "#335588";
return boxcloj.core.ctx.stroke();
});
boxcloj.core.init = (function init(){var dynamics = Box2D.Dynamics;var collision = Box2D.Collision;var gravity_vec = Box2D.Common.Math.b2Vec2;var shapes = collision.Shapes;var b2body_def = dynamics.b2BodyDef;var b2body = dynamics.b2Body;var b2fixture_def = dynamics.b2FixtureDef;var b2fixture = dynamics.b2Fixture;var b2world = dynamics.b2World;var b2circle = shapes.b2CircleShape;var fix_def = (new b2fixture_def());var body_def = (new b2body_def());var position = body_def.position;boxcloj.core.world = (new b2world((new gravity_vec(0.4,0.2)),true));
body_def.type = b2body.b2_dynamicBody;
fix_def.shape = (new b2circle(1));
position.x = 15;
position.y = 15;
return boxcloj.core.world.CreateBody(body_def).CreateFixture(fix_def);
});
boxcloj.core.update = (function update(){boxcloj.core.world.Step((1 / 60),10,10);
boxcloj.core.ctx.clearRect(0,0,1000,1000);
var node_4738 = boxcloj.core.world.GetBodyList();while(true){
if(cljs.core.truth_(node_4738))
{if(cljs.core.truth_(node_4738.GetFixtureList()))
{var x_4739 = (node_4738.GetPosition().x * (boxcloj.core.canvas.width / boxcloj.core.SCALE));var y_4740 = (node_4738.GetPosition().y * (boxcloj.core.canvas.height / boxcloj.core.SCALE));boxcloj.core.draw.call(null,x_4739,y_4740);
} else
{}
} else
{{
var G__4741 = node_4738.GetNext();
node_4738 = G__4741;
continue;
}
}
break;
}
boxcloj.core.world.ClearForces();
return requestAnimFrame(update);
});
boxcloj.core.init.call(null);
requestAnimFrame(boxcloj.core.update);

//@ sourceMappingURL=core.js.map