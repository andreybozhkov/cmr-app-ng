import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-missing-table',
  templateUrl: './missing-table.component.html',
  styleUrls: ['./missing-table.component.css']
})
export class MissingTableComponent {
  haulierData: {
    id: '',
    name: '',
    shipments: []
  };

  constructor(private route: ActivatedRoute) {
    this.route.data.subscribe(data => {
      this.haulierData = {
        id: data.remindersResolver.id,
        name: data.remindersResolver.name,
        shipments: data.remindersResolver.shipments
      };
    });
  }

  sendReminder() {
    let tableDoc = document.getElementById("tableShipments");
    console.log(tableDoc);
    let tableHead = '<thead>';
    let tableBody = '<tbody>';
    let columnIndices = [1,2,3,4,5,6,12,13];
    /*for (let i = 0; i < tableDoc.row.length; i++) {
        let row = '<tr>';
        for (let a = 0; a < tableDoc.rows[i].cells.length; a++) {
            if (columnIndices.includes(a)) {
                if (i === 0) {
                    row += `<th>${tableDoc.rows[i].cells[a].innerHTML}</th>`;
                } else {
                    row += `<td>${tableDoc.rows[i].cells[a].innerHTML}</td>`;    
                }
            }
            if (a === columnIndices[columnIndices.length - 1]) {
                if (i === 0) {
                    row += `</tr></thead>`;
                } else {
                    row += `</tr>`;
                    if (i === tableDoc.rows.length - 1) {
                        row += `</tbody>`;
                    }
                }
            }
        }
        tableBody += row;
    }

    let mailBody = `<table>${tableHead}${tableBody}</table>`;*/
  }
}
