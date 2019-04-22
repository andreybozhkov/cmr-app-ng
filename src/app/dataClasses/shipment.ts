export class Shipment {
    constructor(
        public customer: string,
        public haulier: string,
        public trailer: string,
        public loading_address: string,
        public unloading_address: string,
        public delivery_date: string,
        public project_id: string,
        public shipment_id: string,
        public _id: string = shipment_id,
        public invoice_nr: number,
        public invoice_amount: number,
        public invoice_currency: string,
        public project_resp: string,
        public requested_date: string,
        public status: string,
        public documents_needed: Array<string>,
        public received_date: string,
        public notes_internal: string,
        public reminder_date: string,
        public invoice_nr_missing_cmr: string,
        public _acl: {"creator": string},
        public _kmd: {"ect": string}
    ) { }
}
