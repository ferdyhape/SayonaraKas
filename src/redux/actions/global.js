import moment from 'moment';

export const checkDataUser = db => dispatch => {
  db.transaction(tx => {
    tx.executeSql('SELECT * FROM user', [], (tx, results) => {
      console.log('Results', results.rows.item(0));
      if (results.rows.length > 0) {
        dispatch({
          type: 'SET_USER',
          value: results.rows.item(0),
        });
      } else {
        tx.executeSql(
          'INSERT INTO user (username, password) VALUES (?,?)',
          ['user', 'user'],
          (tx, results) => {
            console.log('Results', results.rowsAffected);
            if (results.rowsAffected > 0) {
              console.log('create user berhasil');
              dispatch({
                type: 'SET_USER',
                value: {
                  id: results.insertId,
                  username: 'user',
                  password: 'user',
                },
              });
            } else {
              console.log('gagal');
            }
          },
        );
      }
    });
  });
};

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
      },
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
      },
    );
  });
};
