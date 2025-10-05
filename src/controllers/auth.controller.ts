import Database from "../config/Database";

const db = Database.getInstance().getConnection();

export const login = async (req: { body: { username: string; password: string; }; }, res: any) => {
  const { username, password } = req.body;
    try {
        const [rows] = await db.execute('SELECT * FROM users WHERE nombre= ? AND contraseña = ?', [username, password]);
    }
}