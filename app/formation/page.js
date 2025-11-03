'use client';
import { useState } from 'react';
import { GraduationCap, Clock, CheckCircle, Tag, Send, AlertCircle } from 'lucide-react';

export default function FormationSection() {
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    email: '',
    telephone: '',
    formations: [],
    codePromo: ''
  });

  const [promoDetails, setPromoDetails] = useState({ applied: false, rate: 0 });
  const [submitStatus, setSubmitStatus] = useState({ type: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const formations = [
    {
      id: 'web',
      titre: 'Développement Web Débutant',
      prix: 15000,
      duree: '36 heures',
      description: 'Apprenez les bases du développement web : HTML, CSS, JavaScript',
      competences: ['HTML5 & CSS3', 'JavaScript ES6+', 'Responsive Design', 'Git & GitHub']
    },
    {
      id: 'bureautique',
      titre: 'Bureautique (Word & Excel)',
      prix: 7500,
      duree: '18 heures',
      description: 'Maîtrisez les outils essentiels de Microsoft Office',
      competences: ['Word avancé', 'Excel & formules', 'Tableaux croisés', 'Mise en page professionnelle']
    }
  ];

  const handleFormationChange = (formationId) => {
    setFormData(prev => {
      const isSelected = prev.formations.includes(formationId);
      return {
        ...prev,
        formations: isSelected 
          ? prev.formations.filter(id => id !== formationId)
          : [...prev.formations, formationId]
      };
    });
    // Reset promo code on selection change
    setPromoDetails({ applied: false, rate: 0 });
    setSubmitStatus({ type: '', message: '' });
  };

  const handlePromoCode = () => {
    const code = formData.codePromo.toUpperCase();
    const numSelected = formData.formations.length;

    if (code === 'DEVLAB') {
      if (numSelected === 2) {
        setPromoDetails({ applied: true, rate: 0.25 });
        setSubmitStatus({ type: 'success', message: 'Code promo DEVLAB appliqué ! Réduction de 25%' });
      } else {
        setPromoDetails({ applied: false, rate: 0 });
        setSubmitStatus({ type: 'error', message: 'Le code DEVLAB est valable uniquement pour les deux formations' });
      }
    } else if (code === 'DEV') {
      if (numSelected === 1) {
        setPromoDetails({ applied: true, rate: 0.10 });
        setSubmitStatus({ type: 'success', message: 'Code promo DEV appliqué ! Réduction de 10%' });
      } else if (numSelected > 1) {
        setPromoDetails({ applied: false, rate: 0 });
        setSubmitStatus({ type: 'error', message: 'Le code DEV est valable pour une seule formation à la fois' });
      } else {
        setPromoDetails({ applied: false, rate: 0 });
        setSubmitStatus({ type: 'error', message: 'Veuillez sélectionner une formation pour utiliser ce code' });
      }
    } else {
      setPromoDetails({ applied: false, rate: 0 });
      setSubmitStatus({ type: 'error', message: 'Code promo invalide' });
    }
  };

  const calculateTotal = () => {
    let total = 0;
    formData.formations.forEach(formationId => {
      const formation = formations.find(f => f.id === formationId);
      if (formation) total += formation.prix;
    });

    if (promoDetails.applied) {
      total = total * (1 - promoDetails.rate);
    }

    return total;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (formData.formations.length === 0) {
      setSubmitStatus({ type: 'error', message: 'Veuillez sélectionner au moins une formation' });
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus({ type: '', message: '' });

    const selectedFormations = formData.formations.map(id => 
      formations.find(f => f.id === id)
    );

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nom: formData.nom,
          prenom: formData.prenom,
          email: formData.email,
          telephone: formData.telephone,
          formations: selectedFormations,
          codePromo: formData.codePromo || null,
          total: calculateTotal(),
          discount: promoDetails.applied,
          discountRate: promoDetails.rate // 👈 ADD THIS LINE
        })
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setSubmitStatus({ 
          type: 'success', 
          message: 'Inscription envoyée avec succès ! Vérifiez votre email pour la confirmation.' 
        });
        setFormData({
          nom: '',
          prenom: '',
          email: '',
          telephone: '',
          formations: [],
          codePromo: ''
        });
        setPromoDetails({ applied: false, rate: 0 });
      } else {
        throw new Error(data.message || 'Erreur lors de l\'envoi');
      }
    } catch (error) {
      setSubmitStatus({ 
        type: 'error', 
        message: 'Erreur lors de l\'envoi. Veuillez réessayer ou nous contacter directement à eco.espe@gmail.com' 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <header className="p-4 bg-gray-100 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <a 
            href="/" 
            className="font-bold text-xl text-gray-900 dark:text-white hover:text-orange-600 dark:hover:text-orange-400 transition-colors inline-block p-2 -ml-2"
          >
            &larr; Accueil
          </a>
        </div>
      </header>
      
      <section id="formation" className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-full mb-6">
              <GraduationCap className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Nos Formations
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Développez vos compétences avec nos formations pratiques et certifiantes
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 mb-12">
            {formations.map(formation => (
              <div 
                key={formation.id}
                className={`p-6 rounded-xl border-2 transition-all cursor-pointer ${
                  formData.formations.includes(formation.id)
                    ? 'border-orange-500 bg-orange-50 dark:bg-orange-900/20 shadow-lg scale-[1.02]'
                    : 'border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 hover:border-orange-300'
                }`}
                onClick={() => handleFormationChange(formation.id)}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1 pr-4">
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-2">
                      {formation.titre}
                    </h3>
                    <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 mb-3">
                      <Clock className="w-4 h-4" />
                      <span>{formation.duree}</span>
                    </div>
                  </div>
                  <div className="flex-shrink-0">
                    <input
                      type="checkbox"
                      readOnly
                      checked={formData.formations.includes(formation.id)}
                      className="w-6 h-6 rounded border-gray-300 text-orange-500 focus:ring-orange-500 pointer-events-none"
                    />
                  </div>
                </div>
                
                <p className="text-gray-700 dark:text-gray-300 mb-4 text-sm sm:text-base">
                  {formation.description}
                </p>
                
                <div className="mb-4">
                  <p className="font-semibold text-gray-900 dark:text-white mb-2 text-sm sm:text-base">
                    Ce que vous allez apprendre :
                  </p>
                  <ul className="space-y-2">
                    {formation.competences.map((comp, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-gray-700 dark:text-gray-300 text-sm sm:text-base">
                        <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                        <span>{comp}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="text-2xl sm:text-3xl font-bold text-orange-600 dark:text-orange-400 mt-4">
                  {formation.prix.toLocaleString()} DZD
                </div>
              </div>
            ))}
          </div>

          <div className="max-w-3xl mx-auto bg-gradient-to-br from-gray-50 to-orange-50 dark:from-gray-800 dark:to-gray-900 p-6 sm:p-8 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700">
            <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-6 text-center">
              Formulaire d'Inscription
            </h3>

            {submitStatus.message && (
              <div className={`mb-6 p-4 rounded-lg flex items-start gap-3 ${
                submitStatus.type === 'success' 
                  ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300'
                  : 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300'
              }`}>
                <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <p className="text-sm">{submitStatus.message}</p>
              </div>
            )}

            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="nom" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Nom *
                  </label>
                  <input
                    type="text"
                    id="nom"
                    required
                    value={formData.nom}
                    onChange={(e) => setFormData({...formData, nom: e.target.value})}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label htmlFor="prenom" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Prénom *
                  </label>
                  <input
                    type="text"
                    id="prenom"
                    required
                    value={formData.prenom}
                    onChange={(e) => setFormData({...formData, prenom: e.target.value})}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>

              <div>
                <label htmlFor="telephone" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Téléphone *
                </label>
                <input
                  type="tel"
                  id="telephone"
                  required
                  value={formData.telephone}
                  onChange={(e) => setFormData({...formData, telephone: e.target.value})}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Formations sélectionnées
                </label>
                <div className="p-4 bg-white dark:bg-gray-700 rounded-lg border border-gray-300 dark:border-gray-600 min-h-[60px]">
                  {formData.formations.length === 0 ? (
                    <p className="text-gray-500 dark:text-gray-400 text-sm">
                      Aucune formation sélectionnée
                    </p>
                  ) : (
                    <ul className="space-y-2">
                      {formData.formations.map(id => {
                        const formation = formations.find(f => f.id === id);
                        return (
                          <li key={id} className="flex justify-between items-center text-sm">
                            <span className="text-gray-900 dark:text-white font-medium">
                              {formation.titre}
                            </span>
                            <span className="text-orange-600 dark:text-orange-400 font-semibold">
                              {formation.prix.toLocaleString()} DZD
                            </span>
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </div>
              </div>

              <div>
                <label htmlFor="codePromo" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Code Promo (optionnel)
                </label>
                <div className="flex flex-col sm:flex-row gap-2">
                  <input
                    type="text"
                    id="codePromo"
                    value={formData.codePromo}
                    onChange={(e) => setFormData({...formData, codePromo: e.target.value})}
                    placeholder="Ex: DEV (10%) ou DEVLAB (25%)"
                    className="flex-1 px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                  <button
                    type="button"
                    onClick={handlePromoCode}
                    className="px-6 py-3 bg-gray-200 dark:bg-gray-600 text-gray-900 dark:text-white font-semibold rounded-lg hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors flex items-center justify-center gap-2"
                  >
                    <Tag className="w-5 h-5" />
                    <span>Appliquer</span>
                  </button>
                </div>
                <p className="text-xs text-gray-600 dark:text-gray-400 mt-2">
                  Code 'DEV' : 10% sur une formation. Code 'DEVLAB' : 25% sur les deux.
                </p>
              </div>

              <div className="p-6 bg-gradient-to-r from-orange-100 to-red-100 dark:from-orange-900/30 dark:to-red-900/30 rounded-lg border-2 border-orange-500">
                <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2 mb-2">
                  <span className="text-lg text-gray-700 dark:text-gray-300 font-semibold">
                    Total à Payer
                  </span>
                  <span className="text-3xl font-bold text-orange-600 dark:text-orange-400">
                    {calculateTotal().toLocaleString()} DZD
                  </span>
                </div>
                {promoDetails.applied && (
                  <p className="text-sm text-green-600 dark:text-green-400 font-medium text-right">
                    Réduction de {promoDetails.rate * 100}% appliquée !
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting || formData.formations.length === 0}
                className="w-full px-8 py-4 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold rounded-lg shadow-lg transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2 text-lg"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Envoi en cours...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    S'inscrire maintenant
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}