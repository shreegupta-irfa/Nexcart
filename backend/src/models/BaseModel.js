import { supabase } from '../config/supabase.js';
import AppError from '../utils/AppError.js';
export default class BaseModel {
  constructor(table) { this.table = table; }
  async findById(id, select = '*') { const { data, error } = await supabase.from(this.table).select(select).eq('id', id).single(); if (error) throw new AppError(error.code === 'PGRST116' ? 'Record not found' : 'Database operation failed', error.code === 'PGRST116' ? 404 : 500); return data; }
  async create(payload) { const { data, error } = await supabase.from(this.table).insert(payload).select().single(); if (error) throw new AppError('Database operation failed'); return data; }
  async update(id, payload) { const { data, error } = await supabase.from(this.table).update(payload).eq('id', id).select().single(); if (error) throw new AppError('Could not update record', 400); return data; }
  async remove(id) { const { error } = await supabase.from(this.table).delete().eq('id', id); if (error) throw new AppError('Could not delete record', 400); }
}
