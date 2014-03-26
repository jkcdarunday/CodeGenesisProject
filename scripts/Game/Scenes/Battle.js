/*
 *   This program is free software; you can redistribute it and/or
 *   modify it under the terms of the GNU General Public License
 *   as published by the Free Software Foundation; either version 2
 *   of the License, or (at your option) any later version.
 *
 *   This program is distributed in the hope that it will be useful,
 *   but WITHOUT ANY WARRANTY; without even the implied warranty of
 *   MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *   GNU General Public License for more details.
 *
 *   You should have received a copy of the GNU General Public License
 *   along with this program; if not, write to the Free Software
 *   Foundation, Inc., 51 Franklin Street, Fifth Floor,
 *   Boston, MA  02110-1301, USA.
 *
 *   ---
 *   Copyright (C) 2014, Jan Keith Darunday <jkcdarunday@uplb.edu.ph>
 */

define(['KObject','KScene', 'KImage', 'KText'], function(KObject, KScene, KImage, KText){

    var GNetwork = KObject.extend({
        init:function(xOffset){
            KObject.call(this);
            this.PCs = [];
            this.offsetX = xOffset;
        },
        addPC:function(id,name, cpu, ram){
            var zcpu = new KImage('cpu');
            var zdot = new KImage('cpugdot');
            zcpu.set({canvas:{position:{type:'EASE'}}});
//             zcpu.canvasPositionY.set({gradient:{type:'IMMEDIATE'}});
            zdot.set({canvas:{position:{mirror:zcpu,mirrorOffset:{x:90,y:20}}}});
            var zname = new KText(name);
            zname.set({canvas:{position:{mirror:zcpu,mirrorOffset:{x:-90,y:15}}}});
            var zcpup = new KText(cpu + 'GHz');
            zcpup.set({canvas:{position:{mirror:zcpu,mirrorOffset:{x:-90,y:35}}}});
            var zram = new KText(ram+'GB');
            zram.set({canvas:{position:{mirror:zcpu,mirrorOffset:{x:-30,y:35}}}});
            this.PCs.push({id:id,image:zcpu, name:name, cpu:cpu, ram:ram, KTexts:{name:zname, cpu:zcpup, ram:zram}});
            this.addImage(zcpu);
            this.addImage(zdot, 'drawDots');
            this.addImage(zname, 'drawDots');
            this.addImage(zcpup, 'drawDots');
            this.addImage(zram, 'drawDots');
        },
        addImage:function(object, layer){
            if(!layer) layer = 'draw';
            KObject.connect(this, 'update', object, 'update');
            KObject.connect(this, layer, object, 'draw');
        },
        slots:{
            update:function(){
                this.emit('update');
            },
            draw:function(canvas){
                this.overallHeight = this.PCs.length*80;
                var topLeftY = window.innerHeight/2 - this.overallHeight/2;
                var topLeftX = window.innerWidth/2 + this.offsetX;
                var l = this.PCs.length;
                var count=0;
                for(var z =0; z<l; z++){
                    this.PCs[z].KTexts.name.set({text:this.PCs[z].name});
                    this.PCs[z].KTexts.cpu.set({text:this.PCs[z].cpu});
                    this.PCs[z].KTexts.ram.set({text:this.PCs[z].ram});
                    this.PCs[z].image.set({canvas:{attachment:'CENTER',position:{x:topLeftX,y:topLeftY+80*count}}});
//                     this.emit('update');
                    count++;
                }
                this.emit('draw', canvas);
                this.emit('drawDots', canvas);
            }
        }
    });

    return KScene.extend({
        init: function(){
            KScene.call(this);
            this.setBackground('fadeBG');
            this.left = new GNetwork(-300);
            this.right = new GNetwork(300);
            this.addImage(this.left);
            this.addImage(this.right);
            this.left.addPC(0, "lel", "99", "22");
            this.left.addPC(1, "lel", "23", "22");
            this.left.addPC(2, "lel", "23", "22");
            this.right.addPC(0, "lel", "23", "22");
            this.right.addPC(1, "lel", "23", "22");
            this.right.addPC(2, "lel", "23", "22");
            this.right.addPC(3, "lel", "23", "22");
            this.right.addPC(4, "lel", "23", "22");
            this.right.addPC(5, "lel", "23", "22");
        },
        slots:{
            windowResized: function(){
            },
            keyReactor: function(key){
            }
        }

    });
});
