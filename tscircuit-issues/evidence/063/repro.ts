import { Resvg } from '@resvg/resvg-js';
const original=await Bun.file('evidence/R6/cam-readback/CAM-top-all-drills.svg').text();
const crop=original.replace(/viewBox="[^"]*"/,'viewBox="-8 -29 16 11"').replace('width="900" height="1400"','width="1600" height="1100"');
new Resvg(crop).render().asPng();
