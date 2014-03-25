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

define(['KObject'], function(KObject){
    return KObject.extend({
        init: function(settings, parent){
            this.constructor.super.call(this);
            this.value = 0;
            this.targetValue = 0;
            this.gradientType = "IMMEDIATE";
            this.gradientInterval = 0;
            this.gradientTolerance = 0.01;
            this.set(settings);
            this.isEqual = true;
            if(parent instanceof KObject)
                KObject.connect(parent, 'updateVariables', this, 'update');
            this.pair = null;
        },
        set: function(config){
            if(config["value"]){
                this.targetValue = config.value;
                this.isEqual = false;
            }
            if(config["actualValue"]){
                this.value = config.actualValue;
                this.isEqual = false;
            }
            if(config["gradient"]){
                if(config.gradient["type"]){
                    this.gradientType = config.gradient.type;
                    if(config.gradient.type == "EASE")
                        this.gradientInterval = 18;
                    else if(config.gradient.type == "LINEAR")
                        this.gradientInterval = 0.1;
                }
                if(config.gradient["interval"])
                    this.gradientInterval = config.gradient.interval;
                if(config.gradient["tolerance"])
                    this.gradientTolerance = config.gradient.tolerance;
            }
            if(config["pair"])
                this.pair = config.pair;
            if(config["mirror"])
                this.mirrorVariable = config.mirror;
        },
        getValue: function(){
            return this.value;
        },
        getDelta: function(){
            return this.targetValue-this.value;
        },
        slots:{
            update: function(){
                var previousEqualityState, currentEqualityState;

                if(this.gradientType == 'MIRROR')
                    if(this.mirrorVariable)
                        this.value = this.targetValue = this.mirrorVariable.getValue();

                if(previousEqualityState = this.value != this.targetValue){
                    var gradientDelta = this.getDelta();
                    if(this.gradientType == 'IMMEDIATE'){
                        this.value = this.targetValue;
                    }else if(this.gradientType == 'LINEAR'){
                        if(this.pair && this.getDelta() > 1 && this.pair.getDelta() > 1){
                                this.value += (this.getDelta()/this.pair.getDelta())*this.gradientInterval;
                        }else {
                            if(this.targetValue < this.value)
                                this.value -= this.gradientInterval;
                            else
                                this.value += this.gradientInterval;
                        }
                    } else if (this.gradientType == 'EASE'){
                        this.value += gradientDelta/this.gradientInterval;
                    }
                    if(Math.abs(gradientDelta) < this.gradientTolerance)
                        this.value = this.targetValue;
                }
                if(currentEqualityState = this.value == this.targetValue){
                    this.isEqual = true;
                } else {
                    this.isEqual = false;
                }
                if(previousEqualityState && currentEqualityState) this.emit("nowEqual");
            }
        }
    });
});
