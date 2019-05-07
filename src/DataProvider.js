export class DataProvider {
    constructor() {
      this._baseDataSheetUrl = `https://sheets.googleapis.com/v4/spreadsheets/1zgT74PMvCWC4LGKk_lVo7qN1gmpuNXWmcsuYg4PU7Fo/values/long?key=${process.env.REACT_APP_SHEETS_ACCESS_KEY}`;
    }
  
    async getLongRoutes() {
      return this.getRoutes('long');
    }
  
    async getShortRoutes() {
      return this.getRoutes('short');
    }
  
    async getRoutes(tableName) {
      const response = await fetch(this.getDataSheetUrl(tableName));
      const responseJson = await response.json();
      return this.readData(responseJson.values);
    }
  
    getDataSheetUrl(tableName){
      return `https://sheets.googleapis.com/v4/spreadsheets/1zgT74PMvCWC4LGKk_lVo7qN1gmpuNXWmcsuYg4PU7Fo/values/${tableName}?key=${process.env.REACT_APP_SHEETS_ACCESS_KEY}`;
    }
  
    readData(rawData) {
      var headerColumns = rawData[0];
      var data = [];
      for (var row = 1; row < rawData.length; row++) {
        var record = {};
        for (var headerColumn in headerColumns) {
          record[headerColumns[headerColumn]] = rawData[row][headerColumn];
        }
  
        data.push(record);
      }
  
      return data;
    }
  }

  export default DataProvider;