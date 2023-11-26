import * as dfd from 'danfojs-node';

export const parseCsv = async <T>(pathToCsvFile: string) => {
  try {
    let df = await dfd.readCSV(pathToCsvFile);
    const jsonObj = dfd.toJSON(df, { format: 'column' });
    return jsonObj as T[];
  } catch (error) {
    throw new Error('Error reading CSV: ' + error);
  }
};
