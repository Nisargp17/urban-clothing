import { useState, useMemo } from 'react';
import {
  useGetProductsQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} from '../../store/apiSlice';
import { formatPrice } from '../../utils/formatPrice';

export default function AdminProducts() {
  const { data: apiProducts = [], isLoading, error } = useGetProductsQuery();
  const [createProduct, { isLoading: isCreating }] = useCreateProductMutation();
  const [updateProduct, { isLoading: isUpdating }] = useUpdateProductMutation();
  const [deleteProduct, { isLoading: isDeleting }] = useDeleteProductMutation();

  const [search, setSearch] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formError, setFormError] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [form, setForm] = useState({
    title: '',
    newPrice: '',
    oldPrice: '',
    stock: '',
    category: 'mens',
    tags: '',
  });

  const products = apiProducts.products || apiProducts;
  const isMutating = isCreating || isUpdating || isDeleting;

  const filtered = useMemo(() => {
    if (!Array.isArray(products)) return [];
    if (!search.trim()) return products;
    const q = search.toLowerCase();
    return products.filter((p) =>
      p.title?.toLowerCase().includes(q) ||
      p.tags?.some((t) => t.toLowerCase().includes(q))
    );
  }, [products, search]);

  const handleOpenAdd = () => {
    setForm({ title: '', newPrice: '', oldPrice: '', stock: '', category: 'mens', tags: '' });
    setSelectedFile(null);
    setEditingId(null);
    setFormError('');
    setShowForm(true);
  };

  const handleOpenEdit = (product) => {
    setForm({
      title: product.title || '',
      newPrice: product.newPrice || '',
      oldPrice: product.oldPrice || '',
      stock: product.stock ?? 10,
      category: product.category || 'mens',
      tags: Array.isArray(product.tags) ? product.tags.join(', ') : '',
    });
    setSelectedFile(null);
    setEditingId(product.id || product._id);
    setFormError('');
    setShowForm(true);
  };

  const buildFormData = () => {
    const fd = new FormData();
    fd.append('title', form.title);
    fd.append('newPrice', String(form.newPrice));
    if (form.oldPrice) fd.append('oldPrice', String(form.oldPrice));
    fd.append('stock', String(form.stock));
    fd.append('category', form.category);
    if (form.tags) {
      form.tags.split(',').map((t) => t.trim()).filter(Boolean).forEach((tag) => fd.append('tags', tag));
    }
    if (selectedFile) fd.append('image', selectedFile);
    return fd;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError('');
    try {
      const formData = buildFormData();
      if (editingId) {
        await updateProduct({ id: editingId, formData }).unwrap();
      } else {
        if (!selectedFile) {
          setFormError('Product image is required');
          return;
        }
        await createProduct(formData).unwrap();
      }
      setShowForm(false);
      setEditingId(null);
      setSelectedFile(null);
    } catch (err) {
      setFormError(err?.data?.message || err?.error || 'Failed to save product. Please try again.');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this product?')) return;
    try {
      await deleteProduct(id).unwrap();
    } catch (err) {
      alert(err?.data?.message || 'Failed to delete product.');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold tracking-[0.1em]">PRODUCTS</h2>
          <p className="text-sm text-[#2a2520]/40 mt-1">{filtered.length} products in catalog</p>
        </div>
        <button
          onClick={handleOpenAdd}
          className="px-4 py-2.5 bg-[#2a2520] text-white text-xs tracking-[0.15em] font-medium hover:bg-[#c4a35a] hover:text-[#2a2520] transition-colors"
        >
          + ADD PRODUCT
        </button>
      </div>

      {/* Search */}
      <div className="border-b-2 border-[#2a2520]/10 pb-4">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search products..."
          className="w-full max-w-md bg-transparent border-2 border-[#2a2520]/20 px-4 py-2 text-sm outline-none focus:border-[#2a2520] transition-colors"
        />
      </div>

      {/* Form */}
      {showForm && (
        <div className="border-2 border-[#2a2520] bg-white p-5 shadow-[4px_4px_0px_0px_#2a2520]">
          <h3 className="text-sm font-bold tracking-[0.15em] mb-4">
            {editingId ? 'EDIT PRODUCT' : 'ADD PRODUCT'}
          </h3>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-[10px] tracking-[0.15em] text-[#2a2520]/50 block mb-1">TITLE</label>
              <input
                required
                value={form.title}
                onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
                className="w-full border-2 border-[#2a2520]/20 px-3 py-2 text-sm outline-none focus:border-[#2a2520]"
              />
            </div>
            <div>
              <label className="text-[10px] tracking-[0.15em] text-[#2a2520]/50 block mb-1">PRODUCT IMAGE {!editingId && '*'}</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setSelectedFile(e.target.files[0] || null)}
                className="w-full border-2 border-[#2a2520]/20 px-3 py-2 text-sm outline-none focus:border-[#2a2520] file:mr-3 file:text-xs file:bg-[#2a2520] file:text-white file:px-2 file:py-1 file:border-0"
              />
              {selectedFile && (
                <p className="text-[10px] text-[#2a2520]/50 mt-1">Selected: {selectedFile.name}</p>
              )}
            </div>
            <div>
              <label className="text-[10px] tracking-[0.15em] text-[#2a2520]/50 block mb-1">PRICE</label>
              <input
                required
                type="number"
                value={form.newPrice}
                onChange={(e) => setForm((f) => ({ ...f, newPrice: e.target.value }))}
                className="w-full border-2 border-[#2a2520]/20 px-3 py-2 text-sm outline-none focus:border-[#2a2520]"
              />
            </div>
            <div>
              <label className="text-[10px] tracking-[0.15em] text-[#2a2520]/50 block mb-1">OLD PRICE (optional)</label>
              <input
                type="number"
                value={form.oldPrice}
                onChange={(e) => setForm((f) => ({ ...f, oldPrice: e.target.value }))}
                className="w-full border-2 border-[#2a2520]/20 px-3 py-2 text-sm outline-none focus:border-[#2a2520]"
              />
            </div>
            <div>
              <label className="text-[10px] tracking-[0.15em] text-[#2a2520]/50 block mb-1">STOCK</label>
              <input
                required
                type="number"
                value={form.stock}
                onChange={(e) => setForm((f) => ({ ...f, stock: e.target.value }))}
                className="w-full border-2 border-[#2a2520]/20 px-3 py-2 text-sm outline-none focus:border-[#2a2520]"
              />
            </div>
            <div>
              <label className="text-[10px] tracking-[0.15em] text-[#2a2520]/50 block mb-1">CATEGORY</label>
              <select
                value={form.category}
                onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}
                className="w-full border-2 border-[#2a2520]/20 px-3 py-2 text-sm outline-none focus:border-[#2a2520] bg-white"
              >
                <option value="mens">Mens</option>
                <option value="womens">Womens</option>
                <option value="unisex">Unisex</option>
              </select>
            </div>
            <div className="sm:col-span-2">
              <label className="text-[10px] tracking-[0.15em] text-[#2a2520]/50 block mb-1">TAGS (comma separated)</label>
              <input
                value={form.tags}
                onChange={(e) => setForm((f) => ({ ...f, tags: e.target.value }))}
                placeholder="new, sale, trending"
                className="w-full border-2 border-[#2a2520]/20 px-3 py-2 text-sm outline-none focus:border-[#2a2520]"
              />
            </div>
            {formError && (
              <div className="sm:col-span-2 text-xs text-red-600 tracking-wide">{formError}</div>
            )}
            <div className="sm:col-span-2 flex gap-3">
              <button
                type="submit"
                disabled={isMutating}
                className="px-5 py-2.5 bg-[#2a2520] text-white text-xs tracking-[0.15em] font-medium hover:bg-[#c4a35a] hover:text-[#2a2520] transition-colors disabled:opacity-50"
              >
                {isMutating ? 'SAVING...' : editingId ? 'SAVE CHANGES' : 'CREATE PRODUCT'}
              </button>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="px-5 py-2.5 border-2 border-[#2a2520] text-[#2a2520] text-xs tracking-[0.15em] font-medium hover:bg-[#2a2520] hover:text-white transition-colors"
              >
                CANCEL
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Table */}
      <div className="border-2 border-[#2a2520] bg-white overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b-2 border-[#2a2520]/10 text-left text-xs tracking-[0.1em] text-[#2a2520]/40">
              <th className="p-4 font-medium">PRODUCT</th>
              <th className="p-4 font-medium">PRICE</th>
              <th className="p-4 font-medium">STOCK</th>
              <th className="p-4 font-medium">CATEGORY</th>
              <th className="p-4 font-medium">TAGS</th>
              <th className="p-4 font-medium text-right">ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {isLoading && (
              <tr>
                <td colSpan={6} className="p-8 text-center text-xs opacity-40 tracking-wide">Loading products...</td>
              </tr>
            )}
            {error && (
              <tr>
                <td colSpan={6} className="p-8 text-center text-xs text-red-600 tracking-wide">
                  Failed to load products. Please check your connection.
                </td>
              </tr>
            )}
            {!isLoading && !error && filtered.length === 0 && (
              <tr>
                <td colSpan={6} className="p-8 text-center text-xs opacity-40 tracking-wide">No products found.</td>
              </tr>
            )}
            {filtered.map((product) => {
              const productId = product.id || product._id;
              const imageUrl = product.img || product.image || '';
              return (
                <tr key={productId} className="border-b border-[#2a2520]/5 hover:bg-[#f5efe6] transition-colors">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 border border-[#2a2520]/20 overflow-hidden flex-shrink-0">
                        {imageUrl ? (
                          <img src={imageUrl} alt={product.title} className="w-full h-full object-cover" loading="lazy" decoding="async" />
                        ) : (
                          <div className="w-full h-full bg-[#2a2520]/5" />
                        )}
                      </div>
                      <span className="font-medium text-xs">{product.title}</span>
                    </div>
                  </td>
                  <td className="p-4 text-xs">
                    {formatPrice(product.newPrice)}
                    {product.oldPrice && (
                      <span className="line-through opacity-40 ml-2">{formatPrice(product.oldPrice)}</span>
                    )}
                  </td>
                  <td className="p-4 text-xs">{product.stock ?? 10}</td>
                  <td className="p-4 text-xs capitalize">{product.category || 'mens'}</td>
                  <td className="p-4">
                    <div className="flex gap-1 flex-wrap">
                      {product.tags?.slice(0, 2).map((tag) => (
                        <span key={tag} className="px-1.5 py-0.5 text-[10px] bg-[#2a2520]/5 border border-[#2a2520]/10">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => handleOpenEdit(product)}
                        className="px-2 py-1 text-[10px] border border-[#2a2520] hover:bg-[#2a2520] hover:text-white transition-colors"
                      >
                        EDIT
                      </button>
                      <button
                        onClick={() => handleDelete(productId)}
                        className="px-2 py-1 text-[10px] border border-red-300 text-red-600 hover:bg-red-600 hover:text-white transition-colors"
                      >
                        DELETE
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
