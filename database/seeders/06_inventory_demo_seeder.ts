import Equipment from '#models/equipment'
import EquipmentAssignment from '#models/equipment_assignment'
import FailureReport from '#models/failure_report'
import Headquarter from '#models/headquarter'
import Location from '#models/location'
import MaintenanceRecord from '#models/maintenance_record'
import MaintenanceSchedule from '#models/maintenance_schedule'
import User from '#models/user'
import { BaseSeeder } from '@adonisjs/lucid/seeders'
import { DateTime } from 'luxon'

export default class extends BaseSeeder {
  async run() {
    const [admin, manager, technician, user] = await Promise.all([
      User.findBy('email', 'admin@inventario.local'),
      User.findBy('email', 'equipos@inventario.local'),
      User.findBy('email', 'tecnico@inventario.local'),
      User.findBy('email', 'ana.usuario@inventario.local'),
    ])

    const [main, warehouse, branch] = await Promise.all([
      Headquarter.findBy('name', 'Sede Principal'),
      Headquarter.findBy('name', 'Bodega TI'),
      Headquarter.findBy('name', 'Sede Norte'),
    ])

    if (!admin || !manager || !technician || !user || !main || !warehouse || !branch) {
      return
    }

    const [adminOffice, itLab, warehouseStock, branchOperation] = await Promise.all([
      Location.query().where('headquarter_id', main.id).where('area', 'Administracion').first(),
      Location.query().where('headquarter_id', main.id).where('area', 'Tecnologia').first(),
      Location.query().where('headquarter_id', warehouse.id).where('area', 'Almacen').first(),
      Location.query().where('headquarter_id', branch.id).where('area', 'Operacion').first(),
    ])

    if (!adminOffice || !itLab || !warehouseStock || !branchOperation) {
      return
    }

    const laptop = await Equipment.updateOrCreate(
      { internalCode: 'EQ-LAP-0001' },
      {
        internalCode: 'EQ-LAP-0001',
        assetTag: 'ACT-LAP-0001',
        serial: 'SN-LAP-0001',
        type: 'Laptop',
        brand: 'Lenovo',
        model: 'ThinkPad E14',
        ipAddresses: '192.168.10.45, 10.10.1.45',
        macAddress: '00:1A:2B:3C:4D:45',
        processor: 'Intel Core i5-1235U',
        storageType: 'SSD NVMe',
        storageCapacityGb: 512,
        ownershipType: 'owned',
        status: 'active',
        headquarterId: main.id,
        locationId: adminOffice.id,
        currentResponsibleId: user.id,
        secondaryResponsibleId: manager.id,
        purchaseDate: DateTime.fromISO('2025-02-10'),
        warrantyUntil: DateTime.local().plus({ months: 10 }),
        lastMaintenanceAt: DateTime.local().minus({ months: 2 }),
        nextMaintenanceAt: DateTime.local().plus({ months: 1 }),
        notes: 'Equipo asignado para labores administrativas.',
        createdBy: admin.id,
        updatedBy: admin.id,
      }
    )

    const desktop = await Equipment.updateOrCreate(
      { internalCode: 'EQ-DESK-0001' },
      {
        internalCode: 'EQ-DESK-0001',
        assetTag: 'ACT-DESK-0001',
        serial: 'SN-DESK-0001',
        type: 'Desktop',
        brand: 'Dell',
        model: 'OptiPlex 7010',
        ipAddresses: '192.168.20.18',
        macAddress: '00:1A:2B:3C:4D:18',
        processor: 'Intel Core i7-12700',
        storageType: 'SSD',
        storageCapacityGb: 1024,
        ownershipType: 'owned',
        status: 'in_maintenance',
        headquarterId: warehouse.id,
        locationId: itLab.id,
        currentResponsibleId: technician.id,
        secondaryResponsibleId: manager.id,
        purchaseDate: DateTime.fromISO('2024-08-15'),
        warrantyUntil: DateTime.local().plus({ months: 4 }),
        lastMaintenanceAt: DateTime.local().minus({ days: 10 }),
        nextMaintenanceAt: DateTime.local().plus({ months: 3 }),
        notes: 'Equipo en laboratorio por revision preventiva.',
        createdBy: admin.id,
        updatedBy: technician.id,
      }
    )

    const printer = await Equipment.updateOrCreate(
      { internalCode: 'EQ-IMP-0001' },
      {
        internalCode: 'EQ-IMP-0001',
        assetTag: 'ACT-IMP-0001',
        serial: 'SN-IMP-0001',
        type: 'Impresora',
        brand: 'HP',
        model: 'LaserJet Pro M404',
        ipAddresses: '192.168.30.22',
        macAddress: '00:1A:2B:3C:4D:22',
        processor: null,
        storageType: null,
        storageCapacityGb: null,
        ownershipType: 'leased',
        status: 'active',
        headquarterId: branch.id,
        locationId: branchOperation.id,
        currentResponsibleId: manager.id,
        secondaryResponsibleId: technician.id,
        leaseProvider: 'Proveedor Leasing TI',
        leaseContractNumber: 'LEA-2026-001',
        leaseUntil: DateTime.local().plus({ months: 7 }),
        nextMaintenanceAt: DateTime.local().plus({ months: 2 }),
        notes: 'Impresora de arriendo para operacion regional.',
        createdBy: admin.id,
        updatedBy: manager.id,
      }
    )

    await Equipment.updateOrCreate(
      { internalCode: 'EQ-MON-0001' },
      {
        internalCode: 'EQ-MON-0001',
        assetTag: 'ACT-MON-0001',
        serial: 'SN-MON-0001',
        type: 'Monitor',
        brand: 'Samsung',
        model: '24 LED',
        ipAddresses: null,
        macAddress: null,
        processor: null,
        storageType: null,
        storageCapacityGb: null,
        ownershipType: 'owned',
        status: 'inactive',
        headquarterId: warehouse.id,
        locationId: warehouseStock.id,
        currentResponsibleId: null,
        secondaryResponsibleId: manager.id,
        purchaseDate: DateTime.fromISO('2023-11-20'),
        warrantyUntil: DateTime.local().minus({ months: 1 }),
        notes: 'Monitor disponible en bodega.',
        createdBy: admin.id,
        updatedBy: manager.id,
      }
    )

    await EquipmentAssignment.updateOrCreate(
      { equipmentId: laptop.id, userId: user.id },
      {
        equipmentId: laptop.id,
        userId: user.id,
        assignedBy: manager.id,
        assignedAt: DateTime.local().minus({ months: 4 }),
        returnedAt: null,
        notes: 'Asignacion inicial para puesto administrativo.',
      }
    )

    await EquipmentAssignment.updateOrCreate(
      { equipmentId: desktop.id, userId: technician.id },
      {
        equipmentId: desktop.id,
        userId: technician.id,
        assignedBy: manager.id,
        assignedAt: DateTime.local().minus({ days: 10 }),
        returnedAt: null,
        notes: 'Asignado temporalmente para revision tecnica.',
      }
    )

    await EquipmentAssignment.updateOrCreate(
      { equipmentId: printer.id, userId: manager.id },
      {
        equipmentId: printer.id,
        userId: manager.id,
        assignedBy: admin.id,
        assignedAt: DateTime.local().minus({ months: 2 }),
        returnedAt: null,
        notes: 'Responsable operativo de la impresora.',
      }
    )

    const laptopSchedule = await MaintenanceSchedule.updateOrCreate(
      {
        equipmentId: laptop.id,
        maintenanceType: 'preventive',
        scheduledFor: DateTime.local().plus({ months: 1 }),
      },
      {
        equipmentId: laptop.id,
        maintenanceType: 'preventive',
        status: 'scheduled',
        priority: 'medium',
        scheduledFor: DateTime.local().plus({ months: 1 }),
        assignedTechnicianId: technician.id,
        frequencyMonths: 6,
        notes: 'Limpieza fisica, actualizaciones y verificacion de disco.',
        createdBy: manager.id,
        updatedBy: manager.id,
      }
    )

    const desktopSchedule = await MaintenanceSchedule.updateOrCreate(
      {
        equipmentId: desktop.id,
        maintenanceType: 'corrective',
        scheduledFor: DateTime.local().minus({ days: 2 }),
      },
      {
        equipmentId: desktop.id,
        maintenanceType: 'corrective',
        status: 'overdue',
        priority: 'high',
        scheduledFor: DateTime.local().minus({ days: 2 }),
        assignedTechnicianId: technician.id,
        frequencyMonths: null,
        notes: 'Revision por lentitud y reinicios inesperados.',
        createdBy: manager.id,
        updatedBy: technician.id,
      }
    )

    await MaintenanceRecord.updateOrCreateMany(
      ['equipmentId', 'maintenanceScheduleId'],
      [
        {
          equipmentId: laptop.id,
          maintenanceScheduleId: laptopSchedule.id,
          maintenanceType: 'preventive',
          status: 'scheduled',
          priority: 'medium',
          scheduledDate: laptopSchedule.scheduledFor,
          performedAt: null,
          performedBy: null,
          description: 'Mantenimiento preventivo programado.',
          diagnosis: null,
          actionsTaken: null,
          partsReplaced: null,
          cost: '0',
          nextMaintenanceAt: DateTime.local().plus({ months: 7 }),
          createdBy: manager.id,
          updatedBy: manager.id,
        },
        {
          equipmentId: desktop.id,
          maintenanceScheduleId: desktopSchedule.id,
          maintenanceType: 'corrective',
          status: 'in_progress',
          priority: 'high',
          scheduledDate: desktopSchedule.scheduledFor,
          performedAt: DateTime.local().minus({ days: 1 }),
          performedBy: technician.id,
          description: 'Diagnostico de rendimiento y estabilidad.',
          diagnosis: 'Pendiente validacion de memoria y estado de disco.',
          actionsTaken: 'Limpieza interna y prueba inicial de hardware.',
          partsReplaced: null,
          cost: '0',
          nextMaintenanceAt: DateTime.local().plus({ months: 3 }),
          createdBy: manager.id,
          updatedBy: technician.id,
        },
      ]
    )

    await FailureReport.updateOrCreate(
      { equipmentId: desktop.id, title: 'Reinicios inesperados' },
      {
        equipmentId: desktop.id,
        reportedBy: user.id,
        title: 'Reinicios inesperados',
        description: 'El equipo se reinicia durante sesiones de trabajo prolongadas.',
        status: 'open',
        priority: 'high',
        maintenanceRecordId: null,
        closedAt: null,
      }
    )
  }
}
