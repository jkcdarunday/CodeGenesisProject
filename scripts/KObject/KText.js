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
 *   Copyright (C) 2014, Aesir Development Team <admin@aesir.url.ph>
 */

define(['KObject', 'KSmoothVariable'], function(KObject, KSmoothVariable){
    return KObject.extend({
        init:function(text){
            KObject.call(this);
            this.canvasPositionX = new KSmoothVariable({value:0}, this);
            this.canvasPositionY = new KSmoothVariable({value:0}, this);
            this.mirrorOffsetX = 0;
            this.mirrorOffsetY = 0;
            this.font = "Sans";
            this.size = 12;
            this.attachment = 'TOPLEFT';
            if(text)
                this.text = text;
        },
        set:function(flags){
            if(flags["canvas"]){
                if(flags.canvas["position"]){
                    if(flags.canvas.position['x'])
                        this.canvasPositionX.set({value:flags.canvas.position.x});
                    if(flags.canvas.position['y'])
                        this.canvasPositionY.set({value:flags.canvas.position.y});
                    if(flags.canvas.position['type']){
                        this.canvasPositionX.set({gradient:{type:flags.canvas.position.type}});
                        this.canvasPositionY.set({gradient:{type:flags.canvas.position.type}});
                    }
                    if(flags.canvas.position['mirror']){
                        this.canvasPositionX.set({gradient:{type:'MIRROR'},mirror:flags.canvas.position.mirror.canvasPositionX});
                        this.canvasPositionY.set({gradient:{type:'MIRROR'},mirror:flags.canvas.position.mirror.canvasPositionY});
                    }
                    if(flags.canvas.position['mirrorOffset']){
                        if(flags.canvas.position.mirrorOffset['x'])
                            this.canvasPositionX.set({mirrorOffset:flags.canvas.position.mirrorOffset['x']});
                        if(flags.canvas.position.mirrorOffset['y'])
                            this.canvasPositionY.set({mirrorOffset:flags.canvas.position.mirrorOffset['y']});
                    }
                    if(flags.canvas.position['interval']){
                        this.canvasPositionX.set({gradient:{interval:flags.canvas.position.interval}});
                        this.canvasPositionY.set({gradient:{interval:flags.canvas.position.interval}});
                    }
                }
                if(flags.canvas["tolerance"]){
                    this.canvasPositionY.set({gradient:{tolerance:flags.canvas.tolerance}});
                    this.canvasPositionX.set({gradient:{tolerance:flags.canvas.tolerance}});
                }
                if(flags.canvas["attachment"])
                    this.attachment = flags.canvas.attachment;
                if(flags.canvas["size"]){
                    if(flags.canvas.size['x'])
                        this.canvasSizeX.set({value:flags.canvas.size.x});
                    if(flags.canvas.size['y'])
                        this.canvasSizeY.set({value:flags.canvas.size.y});
                }
                if(flags["text"]){
                    this.text = flags.text;
                }
                if(flags["font"]){
                    if(flags.font['family'])
                        this.font = flags.font.family;
                    if(flags.font['size'])
                        this.size = flags.font.size;
                }
            }
        },
        wrapText:function(context, text, x, y, maxWidth, lineHeight) {
            var words = text.split(' ');
            var line = '';

            for(var n = 0; n < words.length; n++) {
                var testLine = line + words[n] + ' ';
                var metrics = context.measureText(testLine);
                var testWidth = metrics.width;
                if (testWidth > maxWidth && n > 0) {
                    context.fillText(line, x, y);
                    line = words[n] + ' ';
                    y += lineHeight;
                }
                else {
                    line = testLine;
                }
            }
            context.fillText(line, x, y);
        },
        slots:{
            draw:function(canvas){
                canvas.font = this.size + 'px ' + this.font;
                var repositionedX=this.canvasPositionX.getValue(), repositionedY=this.canvasPositionY.getValue();
                if(this.attachment == 'CENTER'){
                    var measurement = canvas.measureText(this.text);
                    repositionedX -= 400;
                }
                this.wrapText(canvas, this.text, repositionedX, repositionedY, 800, this.size*1.2);
//                 canvas.fillText(this.text, repositionedX, repositionedY);
            },
            update:function(){
                this.emit('updateVariables');
            }
        }
    });
});
