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
    return KScene.extend({
        init: function(){
            this.constructor.super.call(this);
            this.setBackground('fadeBG');
            this.count = 1000;
            this.imageConfig = {
                opacity:0.5,
                canvas:{
                    attachment:'CENTER',
                  tolerance:2,
                  position:{
                      type:'EASE',
                  interval:10,
                  x:window.innerWidth/2,
                  y:window.innerHeight/2
                  }
                },
                fade:{
                    type:'EASE',
                  interval:32,
                  tolerance:0.01
                }
            };
            this.choices = {};
            this.labels = {};
            this.labelText = {};
            this.labelText[-1] = 'Logout';
            this.labelText[0] = 'Battle';
            this.labelText[1] = 'Topology';
            for(var i=-1; i<=1; i++){
                this.choices[i] = new KImage('hexagon', this.imageConfig);
                this.labels[i] = new KText(this.labelText[i]);
                this.labels[i].set({
                    canvas:{
                        attachment:'CENTER',
                        position:{
                            mirror:this.choices[i]
                        }
                    }
                });
                this.addImage(this.choices[i]);
                this.addImage(this.labels[i]);
            }
            this.updateChoicesPositioning();
            this.updateChoice();
        },
        getChoice: function(){
            return this.count%3;
        },
        updateChoicesPositioning: function(){
            for(var i=-1; i<=1; i++){
                var multiplier=1;
                if(i<0)multiplier = -1;
                else multiplier=1;
                this.choices[i].set({
                    canvas:{
                        position:{
                            x:window.innerWidth/2 + multiplier*Math.abs(i)*Math.abs(i)*120,
                            y:window.innerHeight/2
                        }
                    }
                });
            }
        },
        updateChoice: function(){
            for(var i=-1; i<=1; i++){
                if(i==this.getChoice()-1)
                    this.choices[i].set({opacity:0.7});
                else
                    this.choices[i].set({opacity:0.3});
            }
        },
        slots:{
            keyReactor: function(key){
                if(key==37) this.count--;
                if(key==39) this.count++;
                this.updateChoice();
            }
        }

    });
});
