var Endabgabe_Firework;
(function (Endabgabe_Firework) {
    /*
                        Aufgabe: <Endabgabe_Firework>
                        Name: <Alina Jana Hahn>
                        Matrikel: <271344>
                        Datum: < 12.02.2023 >
                        Quellen: <  >
                        */
    class Fountain extends Endabgabe_Firework.Firework {
        target;
        f = 0.1;
        draw() {
            // console.log("draw Fountain");
            Endabgabe_Firework.crc2.save();
            Endabgabe_Firework.crc2.translate(this.position.x, this.position.y);
            Endabgabe_Firework.crc2.beginPath();
            Endabgabe_Firework.crc2.fillStyle = this.color;
            Endabgabe_Firework.crc2.arc(0, 0, 5, 0, 2 * Math.PI);
            Endabgabe_Firework.crc2.fill();
            Endabgabe_Firework.crc2.restore();
        }
        move(_timeslice) {
            // console.log("move Fountain");
            this.position.x = this.position.x + this.f * (this.target.x - this.position.x);
            this.position.y = this.position.y + this.f * (this.target.y - this.position.y);
            if (this.position.x < 0)
                this.position.x += Endabgabe_Firework.crc2.canvas.width;
            if (this.position.y < 0)
                this.position.y += Endabgabe_Firework.crc2.canvas.height;
            if (this.position.x > Endabgabe_Firework.crc2.canvas.width)
                this.position.x -= Endabgabe_Firework.crc2.canvas.width;
            if (this.position.y > Endabgabe_Firework.crc2.canvas.height)
                this.position.y -= Endabgabe_Firework.crc2.canvas.height;
        }
    }
    Endabgabe_Firework.Fountain = Fountain;
})(Endabgabe_Firework || (Endabgabe_Firework = {}));
//# sourceMappingURL=Fountain.js.map