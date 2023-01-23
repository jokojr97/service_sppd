const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Sppd = new Schema({
    nomor_sppd: {
        type: String,
        require: true
    },
    pejabat_yang_memberi_perintah: {
        type: Object,
        require: true
    },
    pegawai_yang_diperintahkan: {
        type: Object,
        require: true
    },
    perihal: {
        type: String,
        require: true
    },
    angkutan: {
        type: String,
        require: true
    },
    tempat_berangkat: {
        type: String,
        require: true
    },
    tempat_tujuan: {
        type: String,
        require: true
    },
    lama_perjalanan: {
        type: String,
        require: true
    },
    tanggal_berangkat: {
        type: Date,
        require: true
    },
    tanggal_kembali: {
        type: Date,
        require: true
    },
    instansi: {
        type: String,
        require: true
    },
    keterangan_lain: {
        type: String,
        require: false
    },
    dikeluarkan_di: {
        type: String,
        require: true
    },
    tanggal_sppd: {
        type: String,
        require: true
    },
    kode_rekening: {
        type: String,
        require: true
    },
    tahun: {
        type: Number,
        require: true
    },
    operator: {
        type: Object,
        require: true
    },
    file: {
        type: String,
        require: false
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Sppd', Sppd)