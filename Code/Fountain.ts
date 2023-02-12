namespace Endabgabe_Firework {
    /*
                        Aufgabe: <Endabgabe_Firework>
                        Name: <Alina Jana Hahn>
                        Matrikel: <271344>
                        Datum: < 12.02.2023 >
                        Quellen: <  >
                        */

    export class Fountain extends Firework {

        private target: Vector;
        private f: number = 0.1;

        public draw(): void {
            // console.log("draw Fountain");

            crc2.save();
            crc2.translate(this.position.x, this.position.y);

            crc2.beginPath();
            crc2.fillStyle = this.color;
            crc2.arc(0, 0, 5, 0, 2 * Math.PI);
            crc2.fill();
            crc2.restore();
        }

        public move(_timeslice: number): void {
            // console.log("move Fountain");

            this.position.x = this.position.x + this.f * (this.target.x - this.position.x);
            this.position.y = this.position.y + this.f * (this.target.y - this.position.y);


            if (this.position.x < 0)
                this.position.x += crc2.canvas.width;
            if (this.position.y < 0)
                this.position.y += crc2.canvas.height;
            if (this.position.x > crc2.canvas.width)
                this.position.x -= crc2.canvas.width;
            if (this.position.y > crc2.canvas.height)
                this.position.y -= crc2.canvas.height;



        }

    }



}