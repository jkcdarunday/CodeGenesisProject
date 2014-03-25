require.config({
    paths: {
        "KThread": "KObject/KThread",
        "KObject": "KObject/KObject",
        "KBase": "KObject/KBase",
        "KCanvas": "KObject/KCanvas",
        "KImage": "KObject/KImage",
        "KScene": "KObject/KScene"
    }
});

define(["KObject", "KThread", "KCanvas", "KScene", "KImage", "KBase"],function(KObject, KThread, KCanvas, KScene, KImage, K){
    var m = new KThread(function(){
            this.docbody[0].innerHTML += "Test";
        },
        1000
    );
    m.docbody = K("body");
//     m.start();

    var cc = new KCanvas('#leCanvas', true);
    var cs = new KScene();
    var x = {};
    var Positioner = new KThread(function(){
        for(var zz in this.images){
            if(zz == this.count%3-1)
                this.images[this.count%3-1].set({
                    opacity:1.0
                });
            else
                this.images[zz].set({
                    opacity:.5
                });
        }
        this.count ++ ;
    }, 1000);
    Positioner.count = 0;
    Positioner.images = {};
    for(var i = -1; i<=1;i++){
        x[i] = new KImage('hexagon');
        x[i].slots.resizedWindow = function(){
            this.setTargetPosition(cc.canvasElement.width/2 + this.offset, cc.canvasElement.height/2);
        };
        x[i].offset = 120*i;
        x[i].set({
            type: 'NORMAL',
            size:{x:100,y:115},
            position:{
                attachment:"CENTER",
                image:{x:0,y:0},
            },
            fade:{
                type:'EASE',
                interval:32
            },
            opacity:0.5,
            animation:{
                type:'EASE',
                 interval:8
            }
        });
        KObject.connect(cc, "windowResized", x[i], "resizedWindow");
        cs.addImage(x[i]);
        Positioner.images[i] = x[i];
    }
    Positioner.start();



    cs.setBackground('fadeBG');
    cc.scene = cs;
    cc.start();
    cc.windowSet(window);
//     var Positioner = KObject.extend({
//         init:function(){
//             this.count=0;
//         },
//         slots:{
//             move:function(){
//                 if(this.count % 4 == 0) this.kimage.setTargetPosition(400,400);
//                 if(this.count % 4 == 1) this.kimage.setTargetPosition(400,100);
//                 if(this.count % 4 == 2) this.kimage.setTargetPosition(100,400);
//                 if(this.count % 4 == 3) this.kimage.setTargetPosition(100,100);
//                 this.count++;
//             }
//         }
//     });
//     var p = new Positioner();
//     p.kimage = heximg;
//     KObject.connect(heximg, "inPosition", p, "move");
});
