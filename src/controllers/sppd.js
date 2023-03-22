const { validationResult } = require('express-validator')
const path = require('path');
const pdf = require('pdf-creator-node')
const fs = require('fs')
const bcrypt = require('bcrypt');

const saltRounds = 10;

const Sppd = require('../models/sppd');
// const Sppd = require('../models/Sppd');

exports.delete = async (req, res, next) => {
    const id = req.params.id || 0;
    if (id == 0) {
        return res.status(400).json({
            message: "invalid value id",
            data: null
        })
        next()
    }

    const data = {
        _id: id
    }

    try {
        const sppd = await Sppd.findOne(data);
        await sppd.remove();
        return res.status(200).json({
            message: "Data dengan id= " + id + " berhasil di hapus",
            data: true
        });
    } catch {
        return res.status(404).json({
            message: "data Sppd not found",
            eror: "not found"
        });
    }

}
exports.update = async (req, res, next) => {
    const errors = validationResult(req);

    const data = {
        _id: req.body._id
    }

    // cek error validasi
    if (!errors.isEmpty()) {
        const err = new Error("invalid value")
        err.errorStatus = 400;
        err.data = errors.array();
        return res.status(err.errorStatus).json({
            message: "Invalid Value!",
            data: err
        })
    }

    await Sppd.findOne(data)
        .then(result => {
            // console.log("id: ", id)
            // console.log("result: ", result)

            if (result) {
                const Sppd = Object.assign(result, req.body);
                Sppd.save().then(result => {
                    res.status(200).json({
                        message: "Update Data Success",
                        data: result
                    });
                }).catch(err => {
                    console.log("err: ", err);
                    res.status(400).json({
                        message: "invalid value",
                        eror: err
                    });
                });

            } else {
                return res.status(400).json({
                    message: "data not found",
                    data: null,
                })
            }
        })
        .catch(err => {
            return res.status(404).json({
                message: "data with id = '" + err.value + "' not found",
                eror: err
            });
            next();
        })


}
exports.insert = async (req, res, next) => {
    // inisiasi error validasi
    const errors = validationResult(req);

    const data = {
        nomor_sppd: req.body.nomor_sppd
    }
    //cek email Sppd sudah terdaftar
    const cariSppd = await Sppd.findOne(data)
    // console.log(cariSppd)
    if (cariSppd != null) {
        return res.status(400).json({
            message: "Nomor SPPD sudah terdaftar! coba pakai Nomor lain",
            data: cariSppd
        })
        next()
    }

    // cek error validasi
    if (!errors.isEmpty()) {
        const err = new Error("invalid value")
        err.errorStatus = 400;
        err.data = errors.array();
        return res.status(err.errorStatus).json({
            message: "Invalid Value!",
            data: err
        })
        next()
    }

    // definisi input
    const nomor_sppd = req.body.nomor_sppd;
    const pejabat_yang_memberi_perintah = req.body.pejabat_yang_memberi_perintah;
    const pegawai_yang_diperintahkan = req.body.pegawai_yang_diperintahkan;
    const perihal = req.body.perihal;
    const angkutan = req.body.angkutan;
    const tempat_berangkat = req.body.tempat_berangkat;
    const tempat_tujuan = req.body.tempat_tujuan;
    const lama_perjalanan = req.body.lama_perjalanan;
    const tanggal_berangkat = req.body.tanggal_berangkat;
    const tanggal_kembali = req.body.tanggal_kembali;
    const instansi = req.body.instansi;
    const keterangan_lain = req.body.keterangan_lain;
    const dikeluarkan_di = req.body.dikeluarkan_di;
    const tanggal_sppd = req.body.tanggal_sppd;
    const kode_rekening = req.body.kode_rekening;
    const tahun = req.body.tahun;

    const insertSppd = new Sppd({
        nomor_sppd: nomor_sppd,
        pejabat_yang_memberi_perintah: pejabat_yang_memberi_perintah,
        pegawai_yang_diperintahkan: pegawai_yang_diperintahkan,
        perihal: perihal,
        angkutan: angkutan,
        tempat_berangkat: tempat_berangkat,
        tempat_tujuan: tempat_tujuan,
        lama_perjalanan: lama_perjalanan,
        tanggal_berangkat: tanggal_berangkat,
        tanggal_kembali: tanggal_kembali,
        instansi: instansi,
        keterangan_lain: keterangan_lain,
        dikeluarkan_di: dikeluarkan_di,
        tanggal_sppd: tanggal_sppd,
        kode_rekening: kode_rekening,
        tahun: tahun,
        operator: {
            id: 1,
            name: "Jo",
            level: "admin"
        },
    });

    insertSppd.save()
        .then(result => {
            res.status(201).json({
                message: "Input SPPD Success",
                data: result
            });
        }).catch(err => {
            console.log("err: ", err);
            res.status(400).json({
                message: "invalid value",
                eror: err
            });
        });
}

exports.getAll = (req, res, next) => {
    const currentPage = req.query.page || 1;
    const perPage = req.query.perPage || 5;
    let totalItem;
    const currentPageInt = parseInt(currentPage);
    const perPageInt = parseInt(perPage);

    Sppd.find().countDocuments()
        .then(count => {
            totalItem = count;
            return Sppd.find().skip((currentPageInt - 1) * perPageInt).limit(perPageInt)
        })
        .then(result => {
            if (totalItem == 0) {
                res.status(400).json({
                    message: "Data masih kosong",
                    data: result,
                })
            } else {
                res.status(200).json({
                    message: "Data berhasil ditampilkan",
                    data: result,
                    total_data: totalItem,
                    current_page: currentPageInt,
                    per_page: perPageInt
                })
            }
        })
        .catch(err => {
            return res.status(400).json({
                message: "invalid value",
                eror: err
            });
            next();
        })
}

exports.getById = async (req, res, next) => {
    const id = req.params.id || 0;
    if (id == 0) {
        return res.status(400).json({
            message: "invalid value id",
            data: null
        })
        next()
    }

    const data = {
        _id: id
    }
    await Sppd.findOne(data)
        .then(result => {
            // console.log("id: ", id)
            // console.log("result: ", result)
            if (result) {
                return res.status(200).json({
                    message: "Data berhasil ditampilkan",
                    data: result,
                })
            } else {
                return res.status(400).json({
                    message: "data not found",
                    data: null,
                })
            }
        })
        .catch(err => {
            return res.status(404).json({
                message: "data with id = '" + err.value + "' not found",
                eror: err
            });
            next();
        })

}

exports.getSearch = async (req, res, next) => {
    const id = req.params.id || 0;
    if (id == 0) {
        return res.status(400).json({
            message: "invalid value id",
            data: null
        })
        next()
    }

    const data = {
        _id: id
    }
    await Sppd.findOne(data)
        .then(result => {
            // console.log("id: ", id)
            // console.log("result: ", result)
            if (result) {
                return res.status(200).json({
                    message: "Data berhasil ditampilkan",
                    data: result,
                })
            } else {
                return res.status(400).json({
                    message: "data not found",
                    data: null,
                })
            }
        })
        .catch(err => {
            return res.status(404).json({
                message: "data with id = '" + err.value + "' not found",
                eror: err
            });
            next();
        })

}

const setPenerimaPerintah = (data) => {
    data.map((v, i) => {
        return v
    })
}

const settext = (e) => {
    if (e==1) {
        return "satu"
    } else if (e==2) {
        return "dua"
    }else if (e==3) {
        return "tiga"
    }else if (e==4) {
        return "empat"
    }else if (e==5) {
        return "lima"
    }
}

exports.createPDF = async (req, res, next) => {

    const html = fs.readFileSync('./index.html', 'utf-8')
    const options = {
        format: "legal",
        orientation: "portrait",
    };

    const pegawai = req.body.pegawai_yang_diperintahkan
    const settextLamaPerjalanan = settext(req.body.lama_perjalanan)
    console.log("data", pegawai)
    var datapegawai = []
    pegawai.map((v, i) => {
        if (i < 1) {
            datapegawai = v
        }
    })

    const datainput = [
        {
            nomor_sppd: req.body.nomor_sppd,
            pejabat_yang_memberi_perintah: {
                name: req.body.pejabat_yang_memberi_perintah.name,
                jabatan: req.body.pejabat_yang_memberi_perintah.jabatan,
                pangkat: req.body.pejabat_yang_memberi_perintah.pangkat,
                nip: req.body.pejabat_yang_memberi_perintah.nip,
                golongan: req.body.pejabat_yang_memberi_perintah.golongan
            },
            pegawai_yang_diperintahkan: [
                {
                    name: datapegawai.name,
                    jabatan: datapegawai.jabatan,
                    pangkat: datapegawai.pangkat,
                    nip: datapegawai.nip,
                    golongan: datapegawai.golongan
                }
            ],
            perihal: req.body.perihal,
            angkutan: req.body.angkutan,
            tempat_berangkat: req.body.tempat_berangkat,
            tempat_tujuan: req.body.tempat_tujuan,
            lama_perjalanan: req.body.lama_perjalanan,
            text_lamaperjalanan: settextLamaPerjalanan,
            tanggal_berangkat: req.body.tanggal_berangkat,
            tanggal_kembali: req.body.tanggal_kembali,
            instansi: req.body.instansi,
            keterangan_lain: req.body.keterangan_lain,
            dikeluarkan_di: req.body.dikeluarkan_di,
            tanggal_sppd: req.body.tanggal_sppd,
            kode_rekening: req.body.kode_rekening,
            tahun: req.body.tahun,
        }
    ];
    const document = {
        html: html,
        data: {
            data: datainput,
        },
        path: `./pdf/sppd_${req.body.nomor_sppd}.pdf`,
        type: "",
    };

    pdf.create(document, options)
        .then((result) => {
            console.log(result);
            return res.status(200).json({
                message: "pdf berhasil dibuat",
                data: result,
                pegawai: datapegawai
            });
        })
        .catch((error) => {
            console.error(error);
            return res.status(404).json({
                message: "data with id = '" + error.value + "' not found",
                eror: error
            });
            next();
        });

}