// R6 original mechanical design. Millimetres. Not JJC replacement geometry.
// Coordinate frame: PCB XY; remote outer back z=0, PCB bottom z=5.
// Separate printable parts selected with -D 'part="base"', etc.
$fn=64;
part="assembly";
remote_w=40; remote_l=60; remote_h=16.8;
pcb_z=5; wall=1.2;
battery_w=15.5; battery_l=27; battery_h=4.2;
module rounded_box(size,r=2){
 linear_extrude(height=size[2]) offset(r=r)
 square([size[0]-2*r,size[1]-2*r],center=true);
}
module remote_base(){
 difference(){
  union(){
   difference(){
    rounded_box([remote_w,remote_l,15.6],3);
    translate([0,0,1.2]) rounded_box([37.6,57.6,15],1.8);
   }
   for(x=[-13,13]) translate([x,24,1.2]) cylinder(d=4.2,h=3.8);
   for(x=[-11,11]) translate([x,-7,1.2]) cylinder(d=2.5,h=3.8);
   for(x=[-13,13]) translate([x,16,1.2]) cylinder(d=8.4,h=3.5);
  }
  for(x=[-13,13]) translate([x,24,1.0]) cylinder(d=1.7,h=8);
  // D42 retention magnets, 6.35 x 3.175; 0.15 mm radial adhesive allowance.
  for(x=[-13,13]) translate([x,16,1]) cylinder(d=6.65,h=4.2);
  // USB opening accommodates 6.5 mm plug body height and cable approach.
  translate([0,29,8]) cube([12,6,9.5],center=true);
  // Side slider actuator and 1.6 mm travel; removable external slide cap.
  translate([19,5,7]) cube([5,7,3.2],center=true);
 }
}
module remote_lid(){
 difference(){
  union(){
   translate([0,0,15.6]) rounded_box([40,60,1.2],3);
   for(x=[-13,13]) translate([x,24,6.15]) cylinder(d=4.2,h=9.45);
  }
  for(p=[[-13.5,-7],[13.5,-4]]) translate([p[0],p[1],15]) cylinder(d=6.2,h=3);
  for(p=[[8,26],[10,0]]) translate([p[0],p[1],15]) cylinder(d=1.6,h=3);
  for(x=[-13,13]) translate([x,24,5.9]) cylinder(d=2.4,h=11.2);
 }
}
module battery_carrier(){
 difference(){
  translate([0,7.8,7.9]) rounded_box([18.5,30,0.4],1.5);
  translate([0,6,8.1]) cube([2.4,2.4,1.0],center=true);
  // C8 relief keeps the carrier floor out of the component-height stack.
  translate([5,17.5,8.1]) cube([5,3,1.0],center=true);
 }
 // Centre each 1 mm tab on its stated X datum: inside faces +/-8.3.
 for(x=[-8.8,8.8]) translate([x-0.5,6.8,8.3]) cube([1,2,7.3]);
}
module button(){
 // TPU compliance is intentional. Set the stem after actual switch-height check.
 difference(){
  union(){cylinder(d=5.8,h=2.7); cylinder(d=8,h=0.8); translate([0,0,-6.6]) cylinder(d=1.6,h=6.6);}
  for(a=[0,120,240]) rotate([0,0,a]) translate([1.2,-0.25,-0.01]) cube([2.5,0.5,0.55]);
 }
}
module slider(){
 // Local origin is the switch body centre at board (15,5), z=6.
 // Fork captures the verified 1.3 mm wide actuator with 0.2 mm each side.
 difference(){
  union(){
   translate([2.8,-1.15,0.1]) cube([3.4,2.3,1.8]);
   translate([5.2,-2.25,0]) cube([2.2,4.5,2.2]);
   translate([4.2,-2.25,0]) cube([0.4,4.5,2.2]);
  }
  translate([2.6,-0.85,-0.1]) cube([1.9,1.7,1.65]);
 }
}
module wire_path(points,r=0.6){
 for(i=[0:len(points)-2]) hull(){
  translate(points[i]) sphere(r=r);
  translate(points[i+1]) sphere(r=r);
 }
}
module magnet_cap(){ cylinder(d=6.6,h=0.5); }
module grip(){
 difference(){
  union(){
   translate([0,-20,0]) rounded_box([68,108,6.5],16);
   // Remote cradle leaves USB and antenna end open; 0.3 mm side clearance.
   for(x=[-21.1,21.1]) translate([x,-38,6.5]) rounded_box([1.6,48,3.3],0.7);
   // Remote end is Y=-12; stop's near face -11.7 leaves 0.3 mm.
   translate([0,-10.9,6.5]) rounded_box([40.6,1.6,1.2],0.7);
  }
  // Four phone attachment magnets, mechanically captive behind a printed cover.
  for(x=[-14,14],y=[-14,14]) translate([x,y,-0.1]) cylinder(d=6.65,h=3.95);
  // Pair for remote docking, retained by adhesive and a 0.5 mm cover.
  for(x=[-13,13]) translate([x,-26,2.8]) cylinder(d=6.65,h=4);
 }
}
module remote_assembly(){
 color([0.18,0.25,0.32,0.45]) remote_base();
 color([0.2,0.32,0.45,0.3]) remote_lid();
 color([0.05,0.4,0.15]) translate([0,0,pcb_z]) difference(){
  rounded_box([36,56,1],2);
  for(x=[-13,13]) translate([x,24,-0.1]) cylinder(d=2.2,h=1.2);
 }
 // External removable carrier supports the pack above the single-face electronics.
 color("silver") translate([-7.75,-5.7,8.3]) cube([15.5,27,4.2]);
 color([0.5,0.6,0.8,0.5]) battery_carrier();
 for(x=[-13,13]) color("silver") translate([x,16,1]) cylinder(d=6.35,h=3.175);
 for(p=[[-13.5,-7],[13.5,-4]]) color("orange") translate([p[0],p[1],14.8]) button();
 color("orange") translate([15,5,6]) slider();
 // Harness reservation: 1.2 mm diameter per insulated conductor; smooth bends
 // and the complete 97-103 mm lead slack are checked during assembly.
 for(dx=[-0.65,0.65]) color(dx<0?"black":"red") wire_path([
  [-13.5+dx,4.5,8.5],[-14+dx,1,12.5],[-14+dx,22,12.5],
  [-15.7+dx,23,14.1],[-15.7+dx,11,14.1],[-9.3+dx,11,14.1],
  [-9.3+dx,23,14.1],[-11.5+dx,23,14.1],[-11.5+dx,-4,14.1],
  [0+dx,-5.7,10.5]
 ]);
 // USB4215 maximum body envelope: official drawing, not a substitute footprint/model.
 color([0.7,0.7,0.75,0.5]) translate([-4.595,21.9101694,6]) cube([9.19,6.75,3.41]);
 // Manufacturer body envelopes; these are clearance volumes, not electronic models.
 color([0.8,0.2,0.1,0.45]) translate([-6.55,-26.275,6]) cube([13.1,18.2,3.1]);
 color([0.9,0.2,0.1,0.2]) translate([-18,-28,0]) cube([36,5.1,16.8]);
 color([0.5,0.5,0.5,0.5]) translate([-17.6,4.5,6]) cube([8.2,12,5.5]);
 color([1,0.5,0,0.4]) translate([-1,5,6.6]) cube([2,2,1.7]);
}
if(part=="base") remote_base();
if(part=="lid") translate([0,0,-15.6]) remote_lid();
if(part=="button") translate([0,0,6.6]) button();
if(part=="slider") slider();
if(part=="grip") grip();
if(part=="carrier") translate([0,0,-7.9]) battery_carrier();
if(part=="magnet_cap") magnet_cap();
if(part=="remote") remote_assembly();
if(part=="assembly"){
 color([0.2,0.25,0.3,0.7]) grip();
 translate([0,-42,6.8]) remote_assembly();
 // Phone/case keep-in envelope: bottom aligned at y=-35 +/-5, not a phone model.
 color([0.3,0.3,0.4,0.15]) translate([-42,-35,-10.5]) cube([84,180,10]);
 color("silver") translate([-22.5,-22.5,-0.5]) cube([45,45,0.5]);
}

if(part=="cutaway") difference(){ remote_assembly(); translate([-30,-35,9.1]) cube([30,70,20]); }
