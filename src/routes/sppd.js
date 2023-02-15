const express = require('express')

const { body } = require('express-validator')
const router = express.Router();

const sppdController = require('../controllers/sppd');


// [POST] : /v1/pegawai/insert
router.post('/insert', [
    body('nomor_sppd').notEmpty().withMessage("nomor_sppd tidak boleh kosong"),
    body('pejabat_yang_memberi_perintah').notEmpty().withMessage("pejabat_yang_memberi_perintah tidak boleh kosong"),
    body('pegawai_yang_diperintahkan').notEmpty().withMessage("pegawai_yang_diperintahkan tidak boleh kosong"),
    body('perihal').notEmpty().withMessage("perihal tidak boleh kosong"),
    body('angkutan').notEmpty().withMessage("angkutan tidak boleh kosong"),
    body('tempat_berangkat').notEmpty().withMessage("tempat_berangkat tidak boleh kosong"),
    body('tempat_tujuan').notEmpty().withMessage("tempat_tujuan tidak boleh kosong"),
    body('lama_perjalanan').notEmpty().withMessage("lama_perjalanan tidak boleh kosong"),
    body('tanggal_berangkat').notEmpty().withMessage("tanggal_berangkat tidak boleh kosong"),
    body('tanggal_kembali').notEmpty().withMessage("tanggal_kembali tidak boleh kosong"),
    body('instansi').notEmpty().withMessage("instansi tidak boleh kosong"),
    body('dikeluarkan_di').notEmpty().withMessage("dikeluarkan_di tidak boleh kosong"),
    body('tanggal_sppd').notEmpty().withMessage("tanggal_sppd tidak boleh kosong"),
    body('kode_rekening').notEmpty().withMessage("kode_rekening tidak boleh kosong")],
    sppdController.insert);


// [PATCH] : /v1/pegawai/edit
router.patch('/update', [
    body('_id').notEmpty().withMessage("Id tidak boleh kosong"),
    body('nomor_sppd').notEmpty().withMessage("nomor_sppd tidak boleh kosong"),
    body('pejabat_yang_memberi_perintah').notEmpty().withMessage("pejabat_yang_memberi_perintah tidak boleh kosong"),
    body('pegawai_yang_diperintahkan').notEmpty().withMessage("pegawai_yang_diperintahkan tidak boleh kosong"),
    body('perihal').notEmpty().withMessage("perihal tidak boleh kosong"),
    body('angkutan').notEmpty().withMessage("angkutan tidak boleh kosong"),
    body('tempat_berangkat').notEmpty().withMessage("tempat_berangkat tidak boleh kosong"),
    body('tempat_tujuan').notEmpty().withMessage("tempat_tujuan tidak boleh kosong"),
    body('lama_perjalanan').notEmpty().withMessage("lama_perjalanan tidak boleh kosong"),
    body('tanggal_berangkat').notEmpty().withMessage("tanggal_berangkat tidak boleh kosong"),
    body('tanggal_kembali').notEmpty().withMessage("tanggal_kembali tidak boleh kosong"),
    body('instansi').notEmpty().withMessage("instansi tidak boleh kosong"),
    body('dikeluarkan_di').notEmpty().withMessage("dikeluarkan_di tidak boleh kosong"),
    body('tanggal_sppd').notEmpty().withMessage("tanggal_sppd tidak boleh kosong"),
    body('kode_rekening').notEmpty().withMessage("kode_rekening tidak boleh kosong")],
    sppdController.update);

// [GET]: /v1/pegawai/ID
router.get('/:id', sppdController.getById)

router.get('/pdf/create', sppdController.createPDF)
// [GET]: /v1/pegawai/ID
router.get('/search/:id', sppdController.getSearch)

// [DELETE]: /v1/pegawai/ID
router.delete('/:id', sppdController.delete)

// [GET]: /v1/pegawai
router.get('/', sppdController.getAll)


module.exports = router;