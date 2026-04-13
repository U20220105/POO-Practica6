import * as readline from "readline";

// ==========================================
// CLASE CAJA FUERTE
// ==========================================
class CajaFuerte {
  private _pin: string;

  constructor() {
    this._pin = "0000"; // PIN por defecto
  }

  // GETTER: Por seguridad, NUNCA muestra el PIN real
  get pin(): string {
    return "****";
  }

  // SETTER: Solo acepta números de EXACTAMENTE 4 dígitos
  set pin(nuevoPIN: string) {
    // Validar que sea un número
    if (!/^\d+$/.test(nuevoPIN)) {
      throw new Error("❌ ERROR DE FORMATO: El PIN debe contener solo números");
    }

    // Validar que tenga exactamente 4 dígitos
    if (nuevoPIN.length !== 4) {
      throw new Error(
        `❌ ERROR DE FORMATO: El PIN debe tener exactamente 4 dígitos (ingresaste ${nuevoPIN.length})`
      );
    }

    // Si pasa las validaciones, guardar el PIN
    this._pin = nuevoPIN;
    console.log("\n✅ PIN configurado correctamente");
    console.log("   Por seguridad, el PIN se muestra como: ****\n");
  }

  // Método para verificar el PIN (simulación de apertura)
  verificarPIN(intentoPIN: string): boolean {
    return this._pin === intentoPIN;
  }

  mostrarEstado(): void {
    console.log("╔════════════════════════════════════════╗");
    console.log("║      🔒 ESTADO DE CAJA FUERTE 🔒     ║");
    console.log("╚════════════════════════════════════════╝");
    console.log(`  PIN configurado: ${this.pin}`);
    console.log(`  Estado: 🔐 CERRADA`);
    console.log("════════════════════════════════════════\n");
  }

  intentarAbrir(intentoPIN: string): void {
    console.log("\n🔓 Intentando abrir caja fuerte...\n");

    if (this.verificarPIN(intentoPIN)) {
      console.log("╔════════════════════════════════════════╗");
      console.log("║      ✅ ACCESO CONCEDIDO ✅           ║");
      console.log("╚════════════════════════════════════════╝");
      console.log("  🔓 Caja fuerte abierta correctamente");
      console.log("════════════════════════════════════════\n");
    } else {
      console.log("╔════════════════════════════════════════╗");
      console.log("║      ❌ ACCESO DENEGADO ❌            ║");
      console.log("╚════════════════════════════════════════╝");
      console.log("  🚨 PIN incorrecto");
      console.log("  🔒 Caja fuerte permanece cerrada");
      console.log("════════════════════════════════════════\n");
    }
  }
}

// ==========================================
// SISTEMA CON READLINE
// ==========================================
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

console.log("\n╔════════════════════════════════════════╗");
console.log("║  EJERCICIO 3: SEGURIDAD CAJA FUERTE   ║");
console.log("╚════════════════════════════════════════╝\n");

const caja = new CajaFuerte();

function configurarPIN() {
  rl.question("🔑 Configure su PIN de 4 dígitos: ", (pin: string) => {
    try {
      caja.pin = pin;
      caja.mostrarEstado();
      probarApertura();
    } catch (error: any) {
      console.log(`\n${error.message}\n`);
      configurarPIN();
    }
  });
}

function probarApertura() {
  rl.question("🔓 Ingrese el PIN para abrir la caja: ", (intento: string) => {
    caja.intentarAbrir(intento);

    rl.question("¿Desea intentar nuevamente? (s/n): ", (respuesta: string) => {
      if (respuesta.toLowerCase() === "s") {
        probarApertura();
      } else {
        console.log("\n✅ Sistema de seguridad finalizado\n");
        rl.close();
      }
    });
  });
}

configurarPIN();