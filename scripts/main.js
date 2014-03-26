require.config({
    paths: {
        "KThread": "KObject/KThread",
        "KObject": "KObject/KObject",
        "KBase": "KObject/KBase",
        "KCanvas": "KObject/KCanvas",
        "KImage": "KObject/KImage",
        "KScene": "KObject/KScene",
        "KSmoothVariable": "KObject/KSmoothVariable",
        "KKeyboard": "KObject/KKeyboard",
        "KText": "KObject/KText",
        "KAjax": "KObject/KAjax",

        "GMenu": "Game/Scenes/Menu",
        "GBattle": "Game/Scenes/Battle"
    }
});

define(["KCanvas", "KScene", 'KObject', "KKeyboard","GMenu", "GBattle", "KAjax"],function(KCanvas, KScene, KObject, KKeyboard, GMenu, GBattle, KAjax){
    var cc = new KCanvas('#leCanvas');
//     KObject.debug['connect'] = true;
    cc.scenes = {};
    var x = new KAjax();
    cc.scenes["menu"] = new GMenu();
    cc.scenes["battle"] = new GBattle();
    cc.scene = cc.scenes["menu"];
    KObject.connect(cc.scenes["menu"], "changeScene", cc, "changeScene");
    KObject.connect(cc.scenes["battle"], "changeScene", cc, "changeScene");

    var kb = new KKeyboard(document.body, false);
    KObject.connect(kb, 'keyDown', cc.scenes['menu'], 'keyReactor');
    KObject.connect(kb, 'keyPress', cc.scenes['battle'], 'keyReactor');
    KObject.connect(cc, 'windowResized', cc.scene, 'windowResized');
    cc.start();
    cc.windowSet(window);
});
