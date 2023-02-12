namespace Endabgabe_Firework {
   /*
                      Aufgabe: <Endabgabe_Firework>
                      Name: <Alina Jana Hahn>
                      Matrikel: <271344>
                      Datum: < 12.02.2023 >
                      Quellen: <  >
                      */


export class Heart extends Firework {

public draw(): void {
    // console.log("draw Heart");
}

public move(_timeslice: number): void {
    // console.log("move Heart");

    let offset: Vector = new Vector(this.velocity.x, this.velocity.y);
    offset.scale(_timeslice);
    this.position.add(offset);



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