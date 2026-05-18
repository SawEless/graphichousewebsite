# Deployment Guide - Graphic House Website

## ✅ What's Fixed

1. **Build Error Fixed**: Added TypeScript interfaces to resolve compilation issues
2. **Services Page Created**: New `/services` route to display all services
3. **Environment Variables**: Updated all API endpoints to use `NEXT_PUBLIC_API_URL`
4. **Backend Integration**: All pages now fetch services from `https://graphichousefinal.onrender.com/api`

## 📋 Steps to Deploy to Vercel

### 1. **Prepare Local Changes**
```bash
# Verify build is working
npm run build

# Test locally
npm run dev
```

### 2. **Push to GitHub**
```bash
git add .
git commit -m "Fix: TypeScript build errors and add services page with backend integration"
git push origin master
```

### 3. **Deploy to Vercel**

**Option A: Using Vercel CLI**
```bash
npm install -g vercel
vercel
# Follow prompts - select your GitHub repo and deploy
```

**Option B: Using Vercel Dashboard**
1. Go to [https://vercel.com](https://vercel.com)
2. Click "Add New..." → "Project"
3. Import your GitHub repository (`SawEless/graphichousewebsite`)
4. In Build Settings:
   - **Framework**: Next.js
   - **Build Command**: `npm run build`
   - **Install Command**: `npm install`
5. Set Environment Variables:
   ```
   NEXT_PUBLIC_API_URL=https://graphichousefinal.onrender.com/api
   ```
6. Click "Deploy"

### 4. **Connect Your .com.np Domain**

After deployment to Vercel:

1. In Vercel Dashboard, go to your project
2. Settings → Domains
3. Add your domain: `www.graphichouse.com.np`
4. Choose "Using Nameservers" or "Using DNS"
5. Update your domain registrar's DNS settings to point to Vercel:
   - Nameservers (if using Vercel's):
     ```
     ns1.vercel-dns.com
     ns2.vercel-dns.com
     ```
   - Or CNAME record (if using existing registrar):
     ```
     CNAME: www.graphichouse.com.np → cname.vercel-dns.com
     ```

### 5. **Troubleshooting Common Vercel Issues**

#### Issue: Build fails on Vercel but works locally

**Solution**: 
- Clear Vercel cache: Project Settings → Advanced → Clear Build Cache
- Re-deploy

#### Issue: Backend API not accessible from Vercel

**Solution**:
- Ensure `https://graphichousefinal.onrender.com/api` is accessible
- Check CORS headers on backend if API errors occur
- Use `NEXT_PUBLIC_API_URL` environment variable

#### Issue: Services not showing

**Solution**:
1. Check browser console for API errors
2. Verify backend is running: `curl https://graphichousefinal.onrender.com/api/services`
3. Check network tab in browser dev tools

## 📊 Routes Available

| Route | Purpose |
|-------|---------|
| `/` | Home page with featured services |
| `/services` | All services page |
| `/category` | Services with category filtering |
| `/contact` | Contact page (if exists) |

## 🔧 Backend Admin Panel

To add/manage services, visit:
**https://graphichousefinal.onrender.com/**

Admin can:
- Add new service categories
- Create services with images and pricing
- All changes appear on website automatically (after 60s cache revalidation)

## 📱 Expected Behavior

After deployment:
1. Users can visit `https://www.graphichouse.com.np`
2. Services added by admin appear on `/services` and `/category` pages
3. Users can filter by category and enquire about services
4. No database needed on website - data fetched from Render backend

---

**Last Updated**: 2025-05-18  
**Status**: ✅ Ready for Deployment
