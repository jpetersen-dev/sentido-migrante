"use client";

import { useState, useEffect } from 'react';
import { FileText, Calendar, Link2, Download, LogOut, ChevronRight, HelpCircle, User, Trash2 } from 'lucide-react';
import { useSession, signOut, signIn } from 'next-auth/react';
import { LogoSymbol } from '@/components/ui/LogoSymbol';

const COUNTRIES = [
  "Afganistán", "Albania", "Alemania", "Andorra", "Angola", "Antigua y Barbuda", "Arabia Saudita", "Argelia", "Argentina", "Armenia", "Australia", "Austria", "Azerbaiyán", "Bahamas", "Bangladés", "Barbados", "Baréin", "Bélgica", "Belice", "Benín", "Bielorrusia", "Birmania", "Bolivia", "Bosnia y Herzegovina", "Botsuana", "Brasil", "Brunéi", "Bulgaria", "Burkina Faso", "Burundi", "Bután", "Cabo Verde", "Camboya", "Camerún", "Canadá", "Catar", "Chad", "Chile", "China", "Chipre", "Ciudad del Vaticano", "Colombia", "Comoras", "Corea del Norte", "Corea del Sur", "Costa de Marfil", "Costa Rica", "Croacia", "Cuba", "Dinamarca", "Dominica", "Ecuador", "Egipto", "El Salvador", "Emiratos Árabes Unidos", "Eritrea", "Eslovaquia", "Eslovenia", "España", "Estados Unidos", "Estonia", "Etiopía", "Filipinas", "Finlandia", "Fiyi", "Francia", "Gabón", "Gambia", "Georgia", "Ghana", "Granada", "Grecia", "Guatemala", "Guyana", "Guinea", "Guinea ecuatorial", "Guinea-Bisáu", "Haití", "Honduras", "Hungría", "India", "Indonesia", "Irak", "Irán", "Irlanda", "Islandia", "Islas Marshall", "Islas Salomón", "Israel", "Italia", "Jamaica", "Japón", "Jordania", "Kazajistán", "Kenia", "Kirguistán", "Kiribati", "Kuwait", "Laos", "Lesoto", "Letonia", "Líbano", "Liberia", "Libia", "Liechtenstein", "Lituania", "Luxemburgo", "Madagascar", "Malasia", "Malaui", "Maldivas", "Malí", "Malta", "Marruecos", "Mauricio", "Mauritania", "México", "Micronesia", "Moldavia", "Mónaco", "Mongolia", "Montenegro", "Mozambique", "Namibia", "Nauru", "Nepal", "Nicaragua", "Níger", "Nigeria", "Noruega", "Nueva Zelanda", "Omán", "Países Bajos", "Pakistán", "Palaos", "Panamá", "Papúa Nueva Guinea", "Paraguay", "Perú", "Polonia", "Portugal", "Reino Unido", "República Centroafricana", "República Checa", "República de Macedonia", "República del Congo", "República Democrática del Congo", "República Dominicana", "República Sudafricana", "Ruanda", "Rumanía", "Rusia", "Samoa", "San Cristóbal y Nieves", "San Marino", "San Vicente y las Granadinas", "Santa Lucía", "Santo Tomé y Príncipe", "Senegal", "Serbia", "Seychelles", "Sierra Leona", "Singapur", "Siria", "Somalia", "Sri Lanka", "Suazilandia", "Sudán", "Sudán del Sur", "Suecia", "Suiza", "Surinam", "Tailandia", "Tanzania", "Tayikistán", "Timor Oriental", "Togo", "Tonga", "Trinidad y Tobago", "Túnez", "Turkmenistán", "Turquía", "Tuvalu", "Ucrania", "Uganda", "Uruguay", "Uzbekistán", "Vanuatu", "Venezuela", "Vietnam", "Yemen", "Yibuti", "Zambia", "Zimbabue"
];

export default function Profile() {
  const { data: session, status } = useSession();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [activeView, setActiveView] = useState<'overview' | 'personal-data'>('overview');

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    country: '',
    timezone: '',
    identityDocument: '',
    address: ''
  });
  const [isUpdating, setIsUpdating] = useState(false);
  const [updateMsg, setUpdateMsg] = useState({ type: '', text: '' });

  useEffect(() => {
    if (session && (session as any).strapiToken) {
      fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL || 'http://127.0.0.1:1337'}/api/users/me`, {
        headers: {
          Authorization: `Bearer ${(session as any).strapiToken}`
        }
      })
      .then(res => res.json())
      .then(data => {
        if (data) {
          setFormData({
            firstName: data.firstName || session.user.name?.split(' ')[0] || '',
            lastName: data.lastName || session.user.name?.split(' ').slice(1).join(' ') || '',
            phone: data.phone || '',
            country: data.country || '',
            timezone: data.timezone || '',
            identityDocument: data.identityDocument || '',
            address: data.address || ''
          });
        }
      })
      .catch(console.error);
    }
  }, [session]);

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUpdating(true);
    setUpdateMsg({ type: '', text: '' });

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL || 'http://127.0.0.1:1337'}/api/users/${session?.user?.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${(session as any).strapiToken}`
        },
        body: JSON.stringify(formData)
      });

      if (!res.ok) throw new Error("Error al actualizar");
      setUpdateMsg({ type: 'success', text: 'Perfil actualizado correctamente' });
    } catch (err: any) {
      setUpdateMsg({ type: 'error', text: err.message });
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDeleteAccount = async () => {
    if (confirm("¿Estás seguro de que deseas eliminar tu cuenta? Esta acción es irreversible y eliminará todo tu historial y datos personales.")) {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL || 'http://127.0.0.1:1337'}/api/users/${session?.user?.id}`, {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${(session as any).strapiToken}`
          }
        });
        if (res.ok) {
          signOut({ callbackUrl: '/' });
        } else {
          alert("Hubo un error al intentar eliminar la cuenta.");
        }
      } catch (err) {
        console.error(err);
        alert("Ocurrió un error.");
      }
    }
  };

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      if (!isLogin) {
        // Registro en Strapi
        const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || "http://127.0.0.1:1337";
        const res = await fetch(`${STRAPI_URL}/api/auth/local/register`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            username: email.split('@')[0],
            email,
            password,
          }),
        });
        
        if (!res.ok) {
          const data = await res.json();
          throw new Error(data?.error?.message || "Error al registrar la cuenta");
        }
      }

      // Iniciar sesión con Credentials
      const res = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      if (res?.error) {
        throw new Error("Credenciales inválidas");
      }
    } catch (err: any) {
      setError(err.message || "Ocurrió un error");
    } finally {
      setIsLoading(false);
    }
  };

  if (status === "loading") {
    return (
      <div className="flex flex-col w-full px-4 pt-16 pb-20 max-w-2xl mx-auto items-center">
        <div className="animate-pulse flex flex-col items-center gap-4">
          <div className="w-20 h-20 bg-cream-200 rounded-full"></div>
          <div className="h-6 w-32 bg-cream-200 rounded"></div>
        </div>
      </div>
    );
  }

  if (!session?.user) {
    return (
      <div className="flex flex-col w-full px-4 pt-10 pb-20 max-w-md mx-auto items-center">
        <div className="w-16 h-16 mb-6">
          <LogoSymbol className="text-olivo w-full h-full" />
        </div>
        <h1 className="text-3xl font-bold font-display tracking-tight text-bluegrey-900 mb-2 text-center">
          {isLogin ? "Bienvenido de nuevo" : "Crea tu cuenta"}
        </h1>
        <p className="text-bluegrey-500 mb-8 text-center text-sm">
          {isLogin 
            ? "Inicia sesión para gestionar tus citas y tu plan terapéutico." 
            : "Únete a Sentido Migrante para empezar tu proceso."}
        </p>

        <button 
          onClick={() => signIn("google")}
          className="w-full py-3.5 bg-white border border-cream-200 text-bluegrey-700 font-bold rounded-2xl flex items-center justify-center gap-3 hover:bg-cream-50 transition-all shadow-sm active:scale-[0.98] mb-6"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
          </svg>
          Continuar con Google
        </button>

        <div className="flex items-center w-full mb-6">
          <div className="flex-1 border-t border-cream-200"></div>
          <span className="px-4 text-xs font-semibold text-bluegrey-300 uppercase tracking-wider">O con tu correo</span>
          <div className="flex-1 border-t border-cream-200"></div>
        </div>

        <form onSubmit={handleAuth} className="w-full flex flex-col gap-4">
          {error && <div className="p-3 bg-red-50 text-red-600 text-sm rounded-xl border border-red-100">{error}</div>}
          
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-bluegrey-700 ml-1">Correo Electrónico</label>
            <input 
              type="email" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3.5 bg-white border border-cream-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-bosque/50 focus:border-bosque transition-all"
              placeholder="tu@correo.com"
            />
          </div>
          
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-bluegrey-700 ml-1">Contraseña</label>
            <input 
              type="password" 
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3.5 bg-white border border-cream-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-bosque/50 focus:border-bosque transition-all"
              placeholder="••••••••"
            />
          </div>

          <button 
            type="submit"
            disabled={isLoading}
            className="w-full mt-2 py-4 bg-bosque text-white font-bold rounded-2xl shadow-[0_4px_15px_rgba(20,184,166,0.2)] hover:bg-bosque-dark transition-all active:scale-[0.98] disabled:opacity-70"
          >
            {isLoading ? "Cargando..." : isLogin ? "Iniciar Sesión" : "Crear Cuenta"}
          </button>
        </form>

        <div className="mt-8 text-sm text-bluegrey-500">
          {isLogin ? "¿No tienes cuenta? " : "¿Ya tienes cuenta? "}
          <button onClick={() => setIsLogin(!isLogin)} className="font-bold text-bosque hover:text-bosque-dark transition-colors">
            {isLogin ? "Regístrate aquí" : "Inicia sesión"}
          </button>
        </div>
      </div>
    );
  }

  if (activeView === 'personal-data') {
    return (
      <div className="flex flex-col w-full px-4 pt-6 pb-20 max-w-2xl mx-auto">
        <button 
          onClick={() => setActiveView('overview')}
          className="flex items-center gap-2 text-bluegrey-500 hover:text-bosque mb-6 w-fit transition-colors"
        >
          <ChevronRight size={20} className="rotate-180" />
          <span className="font-semibold text-sm">Volver al resumen</span>
        </button>

        <h1 className="text-3xl font-bold font-display tracking-tight text-bluegrey-900 mb-2">Datos Personales</h1>
        <p className="text-bluegrey-500 text-sm mb-8">Completa tu información para que podamos gestionar mejor tus citas y facturas.</p>

        {updateMsg.text && (
          <div className={`mb-6 p-4 rounded-xl text-sm font-semibold border ${updateMsg.type === 'success' ? 'bg-green-50 text-green-700 border-green-200' : 'bg-red-50 text-red-600 border-red-100'}`}>
            {updateMsg.text}
          </div>
        )}

        <form onSubmit={handleUpdateProfile} className="flex flex-col gap-5">
          <div className="flex flex-col sm:flex-row gap-5">
            <div className="flex flex-col gap-1.5 flex-1">
              <label className="text-sm font-semibold text-bluegrey-700 ml-1">Nombre(s)</label>
              <input type="text" value={formData.firstName} onChange={(e) => setFormData({...formData, firstName: e.target.value})} className="w-full px-4 py-3.5 bg-white border border-cream-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-bosque/50 focus:border-bosque transition-all" />
            </div>
            <div className="flex flex-col gap-1.5 flex-1">
              <label className="text-sm font-semibold text-bluegrey-700 ml-1">Apellidos</label>
              <input type="text" value={formData.lastName} onChange={(e) => setFormData({...formData, lastName: e.target.value})} className="w-full px-4 py-3.5 bg-white border border-cream-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-bosque/50 focus:border-bosque transition-all" />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-bluegrey-700 ml-1">Correo Electrónico</label>
            <input type="email" disabled defaultValue={session.user.email || ''} className="w-full px-4 py-3.5 bg-cream-50 border border-cream-200 text-bluegrey-500 rounded-2xl cursor-not-allowed" />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-bluegrey-700 ml-1">Teléfono (WhatsApp)</label>
            <input type="tel" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} placeholder="+54 9 11 1234 5678" className="w-full px-4 py-3.5 bg-white border border-cream-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-bosque/50 focus:border-bosque transition-all" />
          </div>

          <div className="flex flex-col sm:flex-row gap-5">
            <div className="flex flex-col gap-1.5 flex-1">
              <label className="text-sm font-semibold text-bluegrey-700 ml-1">País de Residencia</label>
              <select value={formData.country} onChange={(e) => setFormData({...formData, country: e.target.value})} className="w-full px-4 py-3.5 bg-white border border-cream-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-bosque/50 focus:border-bosque transition-all appearance-none">
                <option value="">Selecciona tu país</option>
                {COUNTRIES.map((country, index) => (
                  <option key={index} value={country}>{country}</option>
                ))}
              </select>
            </div>
            <div className="flex flex-col gap-1.5 flex-1">
              <label className="text-sm font-semibold text-bluegrey-700 ml-1">Zona Horaria</label>
              <select value={formData.timezone} onChange={(e) => setFormData({...formData, timezone: e.target.value})} className="w-full px-4 py-3.5 bg-white border border-cream-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-bosque/50 focus:border-bosque transition-all appearance-none">
                <option value="">Selecciona zona horaria</option>
                <option value="America/Argentina/Buenos_Aires">Buenos Aires (GMT-3)</option>
                <option value="America/Santiago">Santiago (GMT-4)</option>
                <option value="Europe/Madrid">Madrid (GMT+1)</option>
                <option value="America/Mexico_City">Ciudad de México (GMT-6)</option>
                <option value="America/Bogota">Bogotá (GMT-5)</option>
                <option value="America/Lima">Lima (GMT-5)</option>
                <option value="America/Caracas">Caracas (GMT-4)</option>
                <option value="America/New_York">New York (EST/EDT)</option>
              </select>
            </div>
          </div>

          <h3 className="text-lg font-bold font-display text-bluegrey-900 mt-4 mb-1">Datos de Facturación (Opcional)</h3>
          
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-bluegrey-700 ml-1">Documento de Identidad (DNI/Pasaporte)</label>
            <input type="text" value={formData.identityDocument} onChange={(e) => setFormData({...formData, identityDocument: e.target.value})} placeholder="Número de documento" className="w-full px-4 py-3.5 bg-white border border-cream-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-bosque/50 focus:border-bosque transition-all" />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-bluegrey-700 ml-1">Dirección Completa</label>
            <input type="text" value={formData.address} onChange={(e) => setFormData({...formData, address: e.target.value})} placeholder="Calle, Número, Ciudad, Código Postal" className="w-full px-4 py-3.5 bg-white border border-cream-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-bosque/50 focus:border-bosque transition-all" />
          </div>

          <button 
            type="submit"
            disabled={isUpdating}
            className="w-full mt-6 py-4 bg-bosque text-white font-bold rounded-2xl shadow-[0_4px_15px_rgba(20,184,166,0.2)] hover:bg-bosque-dark transition-all active:scale-[0.98] disabled:opacity-70"
          >
            {isUpdating ? "Guardando..." : "Guardar Cambios"}
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full px-4 pt-6 pb-20 max-w-2xl mx-auto">
      <div className="flex items-center justify-between mb-10">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold font-display tracking-tight text-bluegrey-900 mb-1">Mi Cuenta</h1>
          <p className="text-bluegrey-500 text-sm font-light">Hola, 👋 {session.user.name?.split(' ')[0] || "Paciente"}</p>
        </div>
        <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-white shadow-md bg-cream-100 flex-shrink-0 flex items-center justify-center">
          {session.user.image ? (
            <img src={session.user.image} alt={session.user.name || "User Profile"} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
          ) : (
            <span className="text-xl font-bold text-bosque">{session.user.name?.charAt(0).toUpperCase() || "U"}</span>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-10">
        {/* Next Session Card */}
        <section className="relative overflow-hidden rounded-[2.5rem] bg-bosque p-8 text-white shadow-[0_15px_40px_rgba(20,184,166,0.3)] border border-olivo/50">
          
          <div className="relative z-10 flex flex-col h-full">
            <div className="flex justify-between items-start mb-8">
              <div className="flex items-center gap-2 px-3.5 py-1.5 bg-white/20 backdrop-blur-md rounded-full text-[0.65rem] font-bold uppercase tracking-widest shadow-sm">
                <Calendar size={14} />
                Próxima Sesión
              </div>
              <span className="text-menta text-sm font-medium bg-bosque-dark/50 px-3 py-1 rounded-lg backdrop-blur-sm">Videollamada</span>
            </div>

            <div className="mb-10">
               <h3 className="text-4xl font-display font-bold mb-2 leading-none text-white drop-shadow-sm">Mañana, 15:30</h3>
               <p className="text-menta font-light text-lg">Psicoterapia Individual con Lic. Martín</p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 mt-auto">
              <button className="flex-1 py-4 bg-white text-bosque-dark font-bold rounded-2xl flex items-center justify-center gap-2 hover:bg-cream-50 transition-all shadow-[0_4px_15px_rgba(0,0,0,0.1)] active:scale-[0.98]">
                <Link2 size={18} /> Entrar a la sesión
              </button>
              <button className="px-6 py-4 bg-bosque-dark/50 hover:bg-bosque-dark/80 backdrop-blur-md text-white font-semibold rounded-2xl transition-all border border-olivo/50 active:scale-[0.98]">
                Reprogramar
              </button>
            </div>
          </div>
        </section>

        {/* Vertical List Items */}
        <div className="flex flex-col gap-3">
          <h3 className="text-xs font-bold uppercase tracking-widest text-bluegrey-400 ml-4 mb-1">Mi Actividad</h3>
          <div className="bg-white rounded-3xl border border-cream-200 shadow-sm overflow-hidden flex flex-col">
            {[
              { id: 'personal-data', icon: User, label: "Datos Personales", color: "text-bluegrey-700", bg: "bg-bluegrey-50" },
              { id: 'history', icon: Calendar, label: "Historial de Citas", color: "text-bosque", bg: "bg-menta" },
              { id: 'plan', icon: FileText, label: "Plan Terapéutico", color: "text-grape-600", bg: "bg-purple-50" },
              { id: 'invoices', icon: Download, label: "Facturas y Recibos", color: "text-bluegrey-600", bg: "bg-cream-100" },
            ].map((item, i, arr) => {
              const Icon = item.icon;
              return (
                <button 
                  key={i} 
                  onClick={() => item.id === 'personal-data' && setActiveView('personal-data')}
                  className={`flex items-center gap-4 p-5 w-full hover:bg-cream-50 transition-colors ${i !== arr.length - 1 ? 'border-b border-cream-100' : ''}`}
                >
                  <div className={`p-3 rounded-2xl ${item.bg} ${item.color}`}>
                    <Icon size={22} className="shrink-0" />
                  </div>
                  <span className="font-semibold text-bluegrey-900 flex-1 text-left text-[15px]">{item.label}</span>
                  <ChevronRight size={18} className="text-bluegrey-300" />
                </button>
              )
            })}
          </div>
        </div>

        {/* Settings & Support */}
        <div className="flex flex-col gap-3">
          <h3 className="text-xs font-bold uppercase tracking-widest text-bluegrey-400 ml-4 mb-1">Ajustes</h3>
          <div className="bg-white rounded-3xl border border-cream-200 shadow-sm overflow-hidden flex flex-col">
             <button className="flex items-center gap-4 p-5 w-full hover:bg-cream-50 transition-colors border-b border-cream-100">
                <div className="p-3 rounded-2xl bg-bluegrey-50 text-bluegrey-600">
                  <HelpCircle size={22} />
                </div>
                <span className="font-semibold text-bluegrey-900 flex-1 text-left text-[15px]">Soporte y Ayuda</span>
                <ChevronRight size={18} className="text-bluegrey-300" />
              </button>
              <button onClick={() => signOut({ callbackUrl: '/' })} className="flex items-center gap-4 p-5 w-full hover:bg-cream-50 transition-colors border-b border-cream-100 group">
                <div className="p-3 rounded-2xl bg-cream-100 group-hover:bg-cream-200 text-bluegrey-700 transition-colors shrink-0">
                  <LogOut size={22} />
                </div>
                <span className="font-semibold flex-1 text-left text-[15px] text-bluegrey-800">Cerrar Sesión</span>
              </button>
              <button onClick={handleDeleteAccount} className="flex items-center gap-4 p-5 w-full hover:bg-red-50 transition-colors text-red-600 group">
                <div className="p-3 rounded-2xl bg-red-50 group-hover:bg-red-100 text-red-600 transition-colors shrink-0">
                  <Trash2 size={22} />
                </div>
                <span className="font-semibold flex-1 text-left text-[15px]">Eliminar Cuenta</span>
              </button>
          </div>
        </div>
      </div>
    </div>
  );
}
