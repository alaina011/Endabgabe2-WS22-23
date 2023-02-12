namespace Endabgabe_Firework {

    /*
                   Aufgabe: <Endabgabe_Firework>
                   Name: <Alina Jana Hahn>
                   Matrikel: <271344>
                   Datum: < 12.02.2023 >
                   Quellen: <  >
                   */

    export class Firework {

        protected position: Vector;
        protected velocity: Vector;
        protected color: string;
        protected size: number;


        constructor(_position?: Vector, _color?: string, _size?: number) {

            this.position = _position;
            this.color = _color;
            this.size = _size;

            this.velocity = new Vector(0, 0);
        }

        public draw(): void {};
        public move(_timeslice: number): void {};

    }

}