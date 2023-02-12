var Endabgabe_Firework;
(function (Endabgabe_Firework) {
    /*
                   Aufgabe: <Endabgabe_Firework>
                   Name: <Alina Jana Hahn>
                   Matrikel: <271344>
                   Datum: < 12.02.2023 >
                   Quellen: <  >
                   */
    class Firework {
        position;
        velocity;
        color;
        size;
        constructor(_position, _color, _size) {
            this.position = _position;
            this.color = _color;
            this.size = _size;
            this.velocity = new Endabgabe_Firework.Vector(0, 0);
        }
        draw() { }
        ;
        move(_timeslice) { }
        ;
    }
    Endabgabe_Firework.Firework = Firework;
})(Endabgabe_Firework || (Endabgabe_Firework = {}));
//# sourceMappingURL=Firework.js.map