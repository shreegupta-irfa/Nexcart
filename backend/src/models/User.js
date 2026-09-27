import BaseModel from './BaseModel.js'; import { supabase } from '../config/supabase.js';
class UserModel extends BaseModel { constructor(){ super('users'); } async byEmail(email) { const { data, error } = await supabase.from('users').select('*').eq('email', email.toLowerCase()).maybeSingle(); if(error) throw error; return data; } async safe(id) { return this.findById(id, 'id,name,email,role,avatar_url,is_active,created_at'); } }
export default new UserModel();
