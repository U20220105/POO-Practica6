import * as readline from "readline";

// ==========================================
// CLASE TANQUE DIESEL
// ==========================================
class TanqueDiesel {
  private _nivelCombustible: number;

  constructor(nivelInicial: number) {
    this._nivelCombustible = 50; // Nivel inicial seguro
    this.nivelCombustible = nivelInicial; // Validar con setter
  }

  // GETTER: Retorna el nivel actual
  get nivelCombustible(): number {
    return this._nivelCombustible;
  }

  // GETTER CALCULADO: Estado del tanque
  get estadoReserva(): string {
    if (this._nivelCombustible < 15) {
      return "🚨 ALERTA: NIVEL CRÍTICO";
    } else {
      return "✅ Nivel Normal";
    }
  }

  // SETTER: Bloquea valores negativos o mayores a 100
  set nivelCombustible(valor: number) {
    if (valor < 0) {
      console.log("\n❌ ERROR: El nivel no puede ser negativo");
      console.log("   Valor rechazado. Manteniendo nivel actual\n");
    } else if (valor > 100) {
      console.log("\n❌ ERROR: El nivel no puede exceder 100%");
      console.log("   Valor rechazado. Manteniendo nivel actual\n");
    } else {
      this._nivelCombustible = valor;
      console.log(`\n✅ Nivel actualizado: ${valor}%\n`);
    }
  }

  mostrarEstado(): void {
    console.log("╔════════════════════════════════════════╗");
    console.log("║    ⛽ MONITOR DE COMBUSTIBLE ⛽       ║");
    console.log("╚════════════════════════════════════════╝");
    console.log(`  Nivel de diésel: ${this._nivelCombustible}%`);
    console.log(`  Estado: ${this.estadoReserva}`);
    
    // Barra visual
    const barraLlena = Math.floor(this._nivelCombustible / 5);
    const barraVacia = 20 - barraLlena;
    const barra = "█".repeat(barraLlena) + "░".repeat(barraVacia);
    
    console.log(`  [${barra}]`);
    
    if (this._nivelCombustible < 15) {
      console.log("\n  ⚠️  ¡ATENCIÓN! Recargar combustible pronto");
    } else if (this._nivelCombustible < 30) {
      console.log("\n  ⚠️  Nivel bajo, considere recargar");
    } else if (this._nivelCombustible >= 90) {
      console.log("\n  ✅ Tanque casi lleno");
    }
    
    console.log("════════════════════════════════════════\n");
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
console.log("║  EJERCICIO 2: SENSOR DE DIÉSEL        ║");
console.log("╚════════════════════════════════════════╝\n");

const tanque = new TanqueDiesel(75);
tanque.mostrarEstado();

function pedirNivel() {
  rl.question("⛽ Ingrese el nivel de combustible (0-100%): ", (nivel: string) => {
    const nivelNum = parseFloat(nivel);

    if (isNaN(nivelNum)) {
      console.log("\n❌ Error: Ingrese un número válido\n");
      pedirNivel();
      return;
    }

    tanque.nivelCombustible = nivelNum;
    tanque.mostrarEstado();

    rl.question("¿Desea actualizar nuevamente? (s/n): ", (respuesta: string) => {
      if (respuesta.toLowerCase() === "s") {
        pedirNivel();
      } else {
        console.log("\n✅ Monitoreo finalizado\n");
        rl.close();
      }
    });
  });
}

pedirNivel();