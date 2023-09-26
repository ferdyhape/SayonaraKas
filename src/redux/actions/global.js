import moment from 'moment';

export const checkDataPemasukan = (db, startDate, endDate) => dispatch => {
  db.transaction(tx => {
    const formattedStartDate = moment(startDate).format('YYYY-MM');
    const formattedEndDate = moment(endDate).format('YYYY-MM');
    tx.executeSql(
      'SELECT * FROM pemasukan WHERE strftime("%Y-%m", tanggal) BETWEEN ? AND ?',
      [formattedStartDate, formattedEndDate],
      (tx, results) => {
        let temp = [];
        let total = 0;
        for (let i = 0; i < results.rows.length; ++i) {
          temp.push(results.rows.item(i));
          total += parseInt(results.rows.item(i).nominal);
        }
        temp.sort((a, b) => new Date(b.tanggal) - new Date(a.tanggal));
        // dispatch({
        //   type: 'SET_LIST_PEMASUKAN',
        //   value: temp,
        // });
        dispatch({
          type: 'SET_TOTAL_PEMASUKAN',
          value: total,
        });
      }
    );
  });
};

export const checkDataPengeluaran = (db, startDate, endDate) => dispatch => {
  db.transaction(tx => {
    const formattedStartDate = moment(startDate).format('YYYY-MM');
    const formattedEndDate = moment(endDate).format('YYYY-MM');
    tx.executeSql(
      'SELECT * FROM pengeluaran WHERE strftime("%Y-%m", tanggal) BETWEEN ? AND ?',
      [formattedStartDate, formattedEndDate],
      (tx, results) => {
        let temp = [];
        let total = 0;
        for (let i = 0; i < results.rows.length; ++i) {
          temp.push(results.rows.item(i));
          total += parseInt(results.rows.item(i).nominal);
        }
        temp.sort((a, b) => new Date(b.tanggal) - new Date(a.tanggal));
        // dispatch({
        //   type: 'SET_LIST_PENGELUARAN',
        //   value: temp,
        // });
        dispatch({
          type: 'SET_TOTAL_PENGELUARAN',
          value: total,
        });
      }
    );
  });
};
