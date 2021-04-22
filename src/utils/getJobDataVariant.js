export default function JobMetadataVariant(key) {
  if (key.startsWith('transcodeShapeDocument')) return 'xml';
  if (key.startsWith('assetMapShapeDocument')) return 'xml';
  if (key.endsWith('transcodePreset')) return 'xml';
  switch (key) {
    case 'item':
      return 'itemId';
    case 'itemId':
      return 'itemId';
    case 'fileId':
      return 'fileId';
    case 'sourceFileId':
      return 'fileId';
    case 'destinationFileId':
      return 'fileId';
    case 'originalFileId':
      return 'fileId';
    case 'username':
      return 'username';
    case 'destinationStorageId':
      return 'storageId';
    case 'sourceStorageId':
      return 'storageId';
    case 'storageId':
      return 'storageId';
    case 'shapeDocument':
      return 'xml';
    case 'result':
      return 'xml';
    case 'jobDocument':
      return 'xml';
    case 'jobStatusDocument':
      return 'xml';
    case 'conformXML':
      return 'xml';
    case 'metadata':
      return 'xml';
    case 'importCompositionPlaylists':
      return 'xml';
    case 'shapeListDocument':
      return 'xml';
    case 'importAssetMap':
      return 'xml';
    case 'importPackingList':
      return 'xml';
    case 'originalShapeIdsStruct':
      return 'json';
    default:
      return undefined;
  }
}
