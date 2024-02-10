const { Router } = require('express');
const router = Router();

const { getPerros, createPerros, getPerroById, getPerroByNombre, deletePerro, getEstadias, createEstadias, getEstadiaById, deleteEstadia, getPeluquerias, createPeluquerias, getPeluqueriaById, deletePeluqueria } = require('../controllers/index.controller');

router.get('/perros', getPerros);
router.get('/perros/:id', getPerroById);
router.get('/perro/:nombre', getPerroByNombre)
router.post('/perros', createPerros);
router.delete('/perros/:id', deletePerro)

router.get('/estadias', getEstadias);
router.get('/estadias/:id', getEstadiaById);
router.post('/estadias', createEstadias);
router.delete('/estadias/:id', deleteEstadia)

router.get('/peluquerias', getPeluquerias);
router.get('/peluquerias/:id', getPeluqueriaById);
router.post('/peluquerias', createPeluquerias);
router.delete('/peluquerias/:id', deletePeluqueria)

module.exports = router;