//task 2
import React, { useState, useEffect } from 'react';
import './custom.css';

const NotebookCustomizer = () => {
  const [design, setDesign] = useState({
    coverDesign: {
      logo: null,
      text: '',
      photo: null,
    },
    pageLayout: 'lined',
    paperType: 'standard',
    bindingType: 'spiral',
    addons: [],
  });

  const [activeTab, setActiveTab] = useState('cover');
  const [price, setPrice] = useState(19.99);
  const [cart, setCart] = useState([]);
  const [showPreview, setShowPreview] = useState(false);

  const paperTypes = [
    { id: 'standard', name: 'Standard', price: 0 },
    { id: 'erasable', name: 'Erasable', price: 5 },
    { id: 'recycled', name: 'Recycled', price: 3 },
    { id: 'premium', name: 'Premium', price: 7 },
    { id: 'textured', name: 'Textured', price: 6 }
  ];

  const pageLayouts = [
    { id: 'lined', name: 'Lined', price: 0 },
    { id: 'dotGrid', name: 'Dot Grid', price: 1 },
    { id: 'blank', name: 'Blank', price: 0 },
    { id: 'squared', name: 'Squared', price: 1 }
  ];

  const bindingTypes = [
    { id: 'spiral', name: 'Spiral Bound', price: 0 },
    { id: 'glue', name: 'Glue Bound', price: 2 },
    { id: 'leather', name: 'Leather Bound', price: 15 },
    { id: 'hardcover', name: 'Hardcover', price: 10 }
  ];

  const addons = [
    { id: 'pen', name: 'Premium Pen', price: 4.99, description: 'High-quality writing pen' },
    { id: 'bookmark', name: 'Ribbon Bookmark', price: 2.99, description: 'Elegant ribbon bookmark' },
    { id: 'elastic', name: 'Elastic Closure', price: 3.99, description: 'Secure elastic band closure' },
    { id: 'pocket', name: 'Back Pocket', price: 5.99, description: 'Additional storage pocket' },
    { id: 'giftPack', name: 'Gift Pack', price: 9.99, description: 'Premium gift packaging' }
  ];

  // Calculate total price whenever design changes
  useEffect(() => {
    let basePrice = 19.99;
    
    // Add paper type price
    const selectedPaper = paperTypes.find(p => p.id === design.paperType);
    basePrice += selectedPaper ? selectedPaper.price : 0;
    
    // Add page layout price
    const selectedLayout = pageLayouts.find(l => l.id === design.pageLayout);
    basePrice += selectedLayout ? selectedLayout.price : 0;
    
    // Add binding price
    const selectedBinding = bindingTypes.find(b => b.id === design.bindingType);
    basePrice += selectedBinding ? selectedBinding.price : 0;
    
    // Add all selected add-ons prices
    const addonsPrice = design.addons.reduce((total, addonId) => {
      const addon = addons.find(a => a.id === addonId);
      return total + (addon ? addon.price : 0);
    }, 0);
    
    basePrice += addonsPrice;
    
    setPrice(Number(basePrice.toFixed(2)));
  }, [design]);

  const handlePhotoUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setDesign({
          ...design,
          coverDesign: { ...design.coverDesign, photo: reader.result }
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleLogoUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setDesign({
          ...design,
          coverDesign: { ...design.coverDesign, logo: reader.result }
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const toggleAddon = (addonId) => {
    setDesign(prev => ({
      ...prev,
      addons: prev.addons.includes(addonId)
        ? prev.addons.filter(id => id !== addonId)
        : [...prev.addons, addonId]
    }));
  };

  const Preview = () => (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Notebook Preview</h2>
        
        <div className="preview-section">
          <h3>Cover Design</h3>
          {design.coverDesign.photo && (
            <img 
              src={design.coverDesign.photo} 
              alt="Cover Photo" 
              className="photo-preview"
            />
          )}
          {design.coverDesign.logo && (
            <img 
              src={design.coverDesign.logo} 
              alt="Logo" 
              className="logo-preview"
            />
          )}
          <p>{design.coverDesign.text || 'No cover text'}</p>
        </div>

        <div className="specifications-grid">
          <div className="specification-box">
            <h3>Specifications</h3>
            <p>Page Layout: {pageLayouts.find(l => l.id === design.pageLayout)?.name}</p>
            <p>Paper Type: {paperTypes.find(p => p.id === design.paperType)?.name}</p>
            <p>Binding: {bindingTypes.find(b => b.id === design.bindingType)?.name}</p>
          </div>

          <div className="specification-box">
            <h3>Add-ons</h3>
            {design.addons.length > 0 ? (
              <ul>
                {design.addons.map(addonId => {
                  const addon = addons.find(a => a.id === addonId);
                  return (
                    <li key={addonId}>
                      {addon?.name} (${addon?.price})
                    </li>
                  );
                })}
              </ul>
            ) : (
              <p>No add-ons selected</p>
            )}
          </div>
        </div>

        <div className="footer">
          <div className="total">Total: ${price}</div>
          <div className="actions">
            <button className="button" onClick={() => setShowPreview(false)}>
              Edit Design
            </button>
            <button className="button primary" onClick={() => {
              setCart([...cart, { ...design, price }]);
              setShowPreview(false);
            }}>
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="notebook-customizer">
      <div className="card">
        <div className="card-header">
          <h2>Custom Notebook Designer</h2>
        </div>
        
        <div className="card-content">
          <div className="tabs">
            {['cover', 'pages', 'paper', 'binding', 'addons'].map((tab) => (
              <button
                key={tab}
                className={`tab-button ${activeTab === tab ? 'active' : ''}`}
                onClick={() => setActiveTab(tab)}
              >
                {tab.replace('_', ' ')}
              </button>
            ))}
          </div>

          <div className="tab-content">
            {activeTab === 'cover' && (
              <div className="tab-pane">
                <div className="form-group">
                  <label>Cover Photo</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoUpload}
                    className="file-input"
                  />
                  {design.coverDesign.photo && (
                    <img
                      src={design.coverDesign.photo}
                      alt="Cover Preview"
                      className="photo-preview"
                    />
                  )}
                </div>

                <div className="form-group">
                  <label>Logo</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleLogoUpload}
                    className="file-input"
                  />
                  {design.coverDesign.logo && (
                    <img
                      src={design.coverDesign.logo}
                      alt="Logo Preview"
                      className="logo-preview"
                    />
                  )}
                </div>

                <div className="form-group">
                  <label>Cover Text</label>
                  <input
                    type="text"
                    value={design.coverDesign.text}
                    onChange={(e) => setDesign({
                      ...design,
                      coverDesign: { ...design.coverDesign, text: e.target.value }
                    })}
                    placeholder="Enter cover text"
                    className="input"
                  />
                </div>
              </div>
            )}

            {activeTab === 'pages' && (
              <div className="tab-pane">
                <div className="form-group">
                  <label>Select Page Layout</label>
                  <select
                    value={design.pageLayout}
                    onChange={(e) => setDesign({ ...design, pageLayout: e.target.value })}
                    className="select"
                  >
                    {pageLayouts.map((layout) => (
                      <option key={layout.id} value={layout.id}>
                        {layout.name} {layout.price > 0 ? `(+$${layout.price})` : ''}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            )}

            {activeTab === 'paper' && (
              <div className="tab-pane">
                <div className="form-group">
                  <label>Select Paper Type</label>
                  <select
                    value={design.paperType}
                    onChange={(e) => setDesign({ ...design, paperType: e.target.value })}
                    className="select"
                  >
                    {paperTypes.map((paper) => (
                      <option key={paper.id} value={paper.id}>
                        {paper.name} {paper.price > 0 ? `(+$${paper.price})` : ''}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            )}

            {activeTab === 'binding' && (
              <div className="tab-pane">
                <div className="form-group">
                  <label>Select Binding Type</label>
                  <select
                    value={design.bindingType}
                    onChange={(e) => setDesign({ ...design, bindingType: e.target.value })}
                    className="select"
                  >
                    {bindingTypes.map((binding) => (
                      <option key={binding.id} value={binding.id}>
                        {binding.name} {binding.price > 0 ? `(+$${binding.price})` : ''}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            )}

            {activeTab === 'addons' && (
              <div className="tab-pane">
                <div className="addons-list">
                  {addons.map((addon) => (
                    <div key={addon.id} className="addon-item">
                      <div className="addon-info">
                        <h3>{addon.name}</h3>
                        <p>${addon.price}</p>
                        <p className="addon-description">{addon.description}</p>
                      </div>
                      <button
                        className={`button ${design.addons.includes(addon.id) ? 'secondary' : ''}`}
                        onClick={() => toggleAddon(addon.id)}
                      >
                        {design.addons.includes(addon.id) ? 'Remove' : 'Add'}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="footer">
            <div className="total">
              Total: ${price}
            </div>
            <div className="actions">
              <button className="button" onClick={() => setShowPreview(true)}>
                Preview Design
              </button>
              <button className="button primary" onClick={() => {
                setCart([...cart, { ...design, price }]);
              }}>
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>

      {showPreview && <Preview />}
    </div>
  );
};

export default NotebookCustomizer;