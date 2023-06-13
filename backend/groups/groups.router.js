import { Router } from 'express'
import multer from 'multer'
import { add_group, add_member, add_transaction, get_groups, get_transaction_by_id, get_transactions, update_member_pending_status_by_id, get_receipt } from './groups.controller.js';

const router = Router();

router.post('/', add_group);  // done
router.get('/', get_groups); // done (both user in, and pending groups with ?pending=true)

router.post('/:group_id/members', add_member); // done
router.get('/:group_id/members/:member_id', update_member_pending_status_by_id); // done

router.post('/:group_id/transactions', multer({ dest: 'uploads/' }).single('receipt'), add_transaction);
router.get('/:group_id/transactions', get_transactions);
router.get('/:group_id/transactions/:transaction_id', get_transaction_by_id);
router.get('/:group_id/transactions/:transaction_id/receipt', get_receipt); // ?action=view or ?action=download

export default router;