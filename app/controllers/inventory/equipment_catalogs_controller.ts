import EquipmentCatalogService from '#services/inventory/equipment_catalog_service'

export default class EquipmentCatalogsController {
  private catalogService = new EquipmentCatalogService()

  index() {
    return this.catalogService.getCatalogs()
  }
}
