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
boxcloj.core.NUM_CIRCLES = 3;
boxcloj.core.MAX_SIZE = 3;
boxcloj.core.MAX_INIT_VEL = 0;
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
boxcloj.core.paired_QMARK_ = (function paired_QMARK_(node){return cljs.core.some.call(null,(function (p1__8557_SHARP_){return cljs.core.contains_QMARK_.call(null,p1__8557_SHARP_,node);
}),cljs.core.deref.call(null,boxcloj.core.pair_list));
});
boxcloj.core.draw_all_BANG_ = (function draw_all_BANG_(nodes){var node = cljs.core.first.call(null,nodes);var nodes__$1 = cljs.core.rest.call(null,nodes);while(true){
if(cljs.core.truth_(node))
{if(cljs.core.truth_(boxcloj.core.paired_QMARK_.call(null,node)))
{boxcloj.core.color = "#aa6633";
} else
{boxcloj.core.color = "black";
}
boxcloj.core.draw_BANG_.call(null,boxcloj.core.color,boxcloj.core.get_draw_args.call(null,node));
{
var G__8558 = cljs.core.first.call(null,nodes__$1);
var G__8559 = cljs.core.rest.call(null,nodes__$1);
node = G__8558;
nodes__$1 = G__8559;
continue;
}
} else
{return null;
}
break;
}
});
boxcloj.core.draw_BANG_ = (function draw_BANG_(color,p__8560){var vec__8562 = p__8560;var x = cljs.core.nth.call(null,vec__8562,0,null);var y = cljs.core.nth.call(null,vec__8562,1,null);var r = cljs.core.nth.call(null,vec__8562,2,null);boxcloj.core.ctx.fillStyle = color;
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
var contact_listener_8563 = dynamics.b2ContactListener;var listener_8564 = (new contact_listener_8563());listener_8564.BeginContact = (function (c){return null;
});
boxcloj.core.world.SetContactListener(listener_8564);
body_def.type = b2body.b2_staticBody;
fix_def.shape = (new b2poly());
var wall_map_8565 = cljs.core.PersistentArrayMap.fromArray([new cljs.core.Keyword(null,"x","x",1013904362),cljs.core.PersistentVector.fromArray([(boxcloj.core.SCALE / 2),(boxcloj.core.SCALE + 1),(boxcloj.core.SCALE / 2),-1], true),new cljs.core.Keyword(null,"y","y",1013904363),cljs.core.PersistentVector.fromArray([(boxcloj.core.SCALE + 1),(boxcloj.core.SCALE / 2),-1,(boxcloj.core.SCALE / 2)], true),new cljs.core.Keyword(null,"width","width",1127031096),cljs.core.PersistentVector.fromArray([(boxcloj.core.SCALE / 2),1,(boxcloj.core.SCALE / 2),1], true),new cljs.core.Keyword(null,"height","height",4087841945),cljs.core.PersistentVector.fromArray([1,(boxcloj.core.SCALE / 2),1,(boxcloj.core.SCALE / 2)], true)], true);var n_8566 = 0;while(true){
if((n_8566 < 4))
{position.x = cljs.core.nth.call(null,wall_map_8565.call(null,new cljs.core.Keyword(null,"x","x",1013904362)),n_8566);
position.y = cljs.core.nth.call(null,wall_map_8565.call(null,new cljs.core.Keyword(null,"y","y",1013904363)),n_8566);
fix_def.shape.SetAsBox(cljs.core.nth.call(null,wall_map_8565.call(null,new cljs.core.Keyword(null,"width","width",1127031096)),n_8566),cljs.core.nth.call(null,wall_map_8565.call(null,new cljs.core.Keyword(null,"height","height",4087841945)),n_8566));
boxcloj.core.world.CreateBody(body_def).CreateFixture(fix_def);
{
var G__8567 = (n_8566 + 1);
n_8566 = G__8567;
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
var G__8568 = (n + 1);
n = G__8568;
continue;
}
} else
{return null;
}
break;
}
});
boxcloj.core.update_forces_BANG_ = (function update_forces_BANG_(){var seq__8581 = cljs.core.seq.call(null,cljs.core.deref.call(null,boxcloj.core.pair_list));var chunk__8582 = null;var count__8583 = 0;var i__8584 = 0;while(true){
if((i__8584 < count__8583))
{var pair = cljs.core._nth.call(null,chunk__8582,i__8584);var seq__8585_8593 = cljs.core.seq.call(null,pair);var chunk__8586_8594 = null;var count__8587_8595 = 0;var i__8588_8596 = 0;while(true){
if((i__8588_8596 < count__8587_8595))
{var body_8597 = cljs.core._nth.call(null,chunk__8586_8594,i__8588_8596);body_8597.ApplyForce(boxcloj.core.b2vec.call(null,10,10),body_8597.GetWorldCenter());
{
var G__8598 = seq__8585_8593;
var G__8599 = chunk__8586_8594;
var G__8600 = count__8587_8595;
var G__8601 = (i__8588_8596 + 1);
seq__8585_8593 = G__8598;
chunk__8586_8594 = G__8599;
count__8587_8595 = G__8600;
i__8588_8596 = G__8601;
continue;
}
} else
{var temp__4092__auto___8602 = cljs.core.seq.call(null,seq__8585_8593);if(temp__4092__auto___8602)
{var seq__8585_8603__$1 = temp__4092__auto___8602;if(cljs.core.chunked_seq_QMARK_.call(null,seq__8585_8603__$1))
{var c__3844__auto___8604 = cljs.core.chunk_first.call(null,seq__8585_8603__$1);{
var G__8605 = cljs.core.chunk_rest.call(null,seq__8585_8603__$1);
var G__8606 = c__3844__auto___8604;
var G__8607 = cljs.core.count.call(null,c__3844__auto___8604);
var G__8608 = 0;
seq__8585_8593 = G__8605;
chunk__8586_8594 = G__8606;
count__8587_8595 = G__8607;
i__8588_8596 = G__8608;
continue;
}
} else
{var body_8609 = cljs.core.first.call(null,seq__8585_8603__$1);body_8609.ApplyForce(boxcloj.core.b2vec.call(null,10,10),body_8609.GetWorldCenter());
{
var G__8610 = cljs.core.next.call(null,seq__8585_8603__$1);
var G__8611 = null;
var G__8612 = 0;
var G__8613 = 0;
seq__8585_8593 = G__8610;
chunk__8586_8594 = G__8611;
count__8587_8595 = G__8612;
i__8588_8596 = G__8613;
continue;
}
}
} else
{}
}
break;
}
{
var G__8614 = seq__8581;
var G__8615 = chunk__8582;
var G__8616 = count__8583;
var G__8617 = (i__8584 + 1);
seq__8581 = G__8614;
chunk__8582 = G__8615;
count__8583 = G__8616;
i__8584 = G__8617;
continue;
}
} else
{var temp__4092__auto__ = cljs.core.seq.call(null,seq__8581);if(temp__4092__auto__)
{var seq__8581__$1 = temp__4092__auto__;if(cljs.core.chunked_seq_QMARK_.call(null,seq__8581__$1))
{var c__3844__auto__ = cljs.core.chunk_first.call(null,seq__8581__$1);{
var G__8618 = cljs.core.chunk_rest.call(null,seq__8581__$1);
var G__8619 = c__3844__auto__;
var G__8620 = cljs.core.count.call(null,c__3844__auto__);
var G__8621 = 0;
seq__8581 = G__8618;
chunk__8582 = G__8619;
count__8583 = G__8620;
i__8584 = G__8621;
continue;
}
} else
{var pair = cljs.core.first.call(null,seq__8581__$1);var seq__8589_8622 = cljs.core.seq.call(null,pair);var chunk__8590_8623 = null;var count__8591_8624 = 0;var i__8592_8625 = 0;while(true){
if((i__8592_8625 < count__8591_8624))
{var body_8626 = cljs.core._nth.call(null,chunk__8590_8623,i__8592_8625);body_8626.ApplyForce(boxcloj.core.b2vec.call(null,10,10),body_8626.GetWorldCenter());
{
var G__8627 = seq__8589_8622;
var G__8628 = chunk__8590_8623;
var G__8629 = count__8591_8624;
var G__8630 = (i__8592_8625 + 1);
seq__8589_8622 = G__8627;
chunk__8590_8623 = G__8628;
count__8591_8624 = G__8629;
i__8592_8625 = G__8630;
continue;
}
} else
{var temp__4092__auto___8631__$1 = cljs.core.seq.call(null,seq__8589_8622);if(temp__4092__auto___8631__$1)
{var seq__8589_8632__$1 = temp__4092__auto___8631__$1;if(cljs.core.chunked_seq_QMARK_.call(null,seq__8589_8632__$1))
{var c__3844__auto___8633 = cljs.core.chunk_first.call(null,seq__8589_8632__$1);{
var G__8634 = cljs.core.chunk_rest.call(null,seq__8589_8632__$1);
var G__8635 = c__3844__auto___8633;
var G__8636 = cljs.core.count.call(null,c__3844__auto___8633);
var G__8637 = 0;
seq__8589_8622 = G__8634;
chunk__8590_8623 = G__8635;
count__8591_8624 = G__8636;
i__8592_8625 = G__8637;
continue;
}
} else
{var body_8638 = cljs.core.first.call(null,seq__8589_8632__$1);body_8638.ApplyForce(boxcloj.core.b2vec.call(null,10,10),body_8638.GetWorldCenter());
{
var G__8639 = cljs.core.next.call(null,seq__8589_8632__$1);
var G__8640 = null;
var G__8641 = 0;
var G__8642 = 0;
seq__8589_8622 = G__8639;
chunk__8590_8623 = G__8640;
count__8591_8624 = G__8641;
i__8592_8625 = G__8642;
continue;
}
}
} else
{}
}
break;
}
{
var G__8643 = cljs.core.next.call(null,seq__8581__$1);
var G__8644 = null;
var G__8645 = 0;
var G__8646 = 0;
seq__8581 = G__8643;
chunk__8582 = G__8644;
count__8583 = G__8645;
i__8584 = G__8646;
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
boxcloj.core.update = (function update(){boxcloj.core.world.Step((1 / 60),10,10);
boxcloj.core.ctx.clearRect(0,0,1000,1000);
boxcloj.core.draw_all_BANG_.call(null,boxcloj.core.get_nodes.call(null,boxcloj.core.world));
boxcloj.core.world.ClearForces();
boxcloj.core.force_BANG_.call(null);
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
var G__8647 = node.GetNext();
var G__8648 = cljs.core.cons.call(null,node,nodes);
node = G__8647;
nodes = G__8648;
continue;
}
} else
{{
var G__8649 = node.GetNext();
var G__8650 = nodes;
node = G__8649;
nodes = G__8650;
continue;
}
}
}
break;
}
});
boxcloj.core.force_BANG_ = (function force_BANG_(){var node = boxcloj.core.world.GetBodyList();while(true){
if(cljs.core.truth_(node))
{if(cljs.core.truth_(node.GetFixtureList()))
{return node.ApplyForce(boxcloj.core.b2vec.call(null,5,5),node.GetWorldCenter());
} else
{{
var G__8651 = node.GetNext();
node = G__8651;
continue;
}
}
} else
{return null;
}
break;
}
});
boxcloj.core.distance_to = (function distance_to(pt1,pt2){return boxcloj.maths.sqrt.call(null,cljs.core.apply.call(null,cljs.core._PLUS_,cljs.core.map.call(null,boxcloj.maths.square,cljs.core.map.call(null,cljs.core._,pt1,pt2))));
});
boxcloj.core.click_in_circ_QMARK_ = (function click_in_circ_QMARK_(click_point,node){var vec__8653 = boxcloj.core.get_draw_args.call(null,node);var x = cljs.core.nth.call(null,vec__8653,0,null);var y = cljs.core.nth.call(null,vec__8653,1,null);var r = cljs.core.nth.call(null,vec__8653,2,null);return (boxcloj.core.distance_to.call(null,click_point,cljs.core.PersistentVector.fromArray([x,y], true)) < r);
});
boxcloj.core.get_circle_at = (function get_circle_at(pt){return cljs.core.first.call(null,cljs.core.filter.call(null,cljs.core.partial.call(null,boxcloj.core.click_in_circ_QMARK_,pt),boxcloj.core.get_nodes.call(null,boxcloj.core.world)));
});
boxcloj.core.canvas.addEventListener("mousedown",(function (e){var x = e.clientX;var y = e.clientY;var circle = boxcloj.core.get_circle_at.call(null,cljs.core.PersistentVector.fromArray([x,y], true));if(cljs.core.truth_(circle))
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
var G__8654 = cljs.core.first.call(null,pairs);
var G__8655 = cljs.core.rest.call(null,pairs);
pair = G__8654;
pairs = G__8655;
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