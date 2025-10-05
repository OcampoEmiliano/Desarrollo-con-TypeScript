// 1. Interfaces del Patrón Observer

/** Define el método que todos los Observadores deben implementar. */
interface Observer {
    update(data: any): void;
}

/** Define los métodos que el Sujeto debe implementar. */
interface Subject {
    attach(observer: Observer): void;
    detach(observer: Observer): void;
    notify(data: any): void;
}

// 2. Implementación del Sujeto (Ejemplo: Servicio de Equipos)

class EquipoService implements Subject {
    private observers: Observer[] = [];

    attach(observer: Observer): void {
        this.observers.push(observer);
    }

    detach(observer: Observer): void {
        this.observers = this.observers.filter(obs => obs !== observer);
    }

    notify(equipoData: any): void {
        console.log(`[SUJETO] Notificando a ${this.observers.length} observadores...`);
        for (const observer of this.observers) {
            observer.update(equipoData);
        }
    }

    // Método de Negocio que dispara la notificación
    public actualizarEstado(equipoId: number, nuevoEstado: string) {
        // ... Lógica para actualizar el estado del equipo en la DB ...

        const equipoActualizado = { id: equipoId, estado: nuevoEstado, timestamp: new Date() };

        // 💥 DISPARA LA NOTIFICACIÓN
        this.notify(equipoActualizado); 
    }
}

// 3. Implementación de los Observadores (Ejemplo: Auditoría y Notificación)

class AuditService implements Observer {
    update(equipoData: any): void {
        // Lógica: Registrar en la tabla de auditoría
        console.log(`[AUDITORÍA] Cambio de estado de equipo ${equipoData.id} a ${equipoData.estado} registrado.`);
    }
}

class NotificationService implements Observer {
    update(equipoData: any): void {
        // Lógica: Enviar correo/alerta
        console.log(`[NOTIFICACIÓN] Enviando alerta: El equipo ${equipoData.id} ahora está en estado '${equipoData.estado}'.`);
    }
}

// 4. Configuración (Inicialización de la aplicación)

const equipoManager = new EquipoService();
const auditor = new AuditService();
const notificador = new NotificationService();

// Registrar los observadores en el sujeto
equipoManager.attach(auditor);
equipoManager.attach(notificador);

// USO: Cualquier cambio significativo dispara las acciones de los Observadores
// equipoManager.actualizarEstado(101, 'En Reparación');